process.env.AWS_URL = "dummy"
process.env.AWS_REGION = "dummy"
process.env.AUDIT_LOG_TABLE_NAME = "bichard-7-production-audit-log"
process.env.TIME_PERIOD_HOURS = "12"
import fetchReportRecords from "./fetchReportRecords"
import generateDates from "./generateDates"
import SendReportUseCase from "./SendReportUseCase"
import { event3, log } from "./test/mocks/fetchApiGatewayResponse"

jest.mock("./fetchReportRecords")

const mockFetch = fetchReportRecords as jest.MockedFunction<typeof fetchReportRecords>
const mockExceptionMessage = "The XML Converter encountered an Error during message UnMarshalling"
const mockExceptionStackTrace =
  "uk.gov.ocjr.mtu.br7.ho.pub.choreography.exception.MessageParsingException: The XML Converter encountered an Error during message unMarshalling"
const mockMessageId = "af0d20f1-0fa6-4d52-a3f6-3c35d0e00f26"
const mockCorrelationId = "CID-e633db32-b2d0-4a0c-b108-4e102084ba28"
const mockPTIURN = "01VK1600008"

describe("SendReportUseCase", () => {
  it("Should correctly generate the report and send the email", async () => {
    const mockEmailer = { sendMail: jest.fn(() => Promise.resolve()) }
    const dates = generateDates(new Date(), 12)

    dates.end.setHours(dates.end.getHours() - 1) // get a valid date to give to the log message
    const mockContent =
      "Received Date,Internal Message ID,External Correlation ID,PTIURN,Error Message\n" +
      `${dates.end.toISOString()},${mockMessageId},${mockCorrelationId},${mockPTIURN},${mockExceptionMessage} (${mockExceptionStackTrace})\n`.repeat(
        2
      )

    event3.addAttribute("Exception Message", mockExceptionMessage)
    event3.addAttribute("Exception Stack Trace", mockExceptionStackTrace)

    const updateMockLog = [
      ...log.slice(0),
      {
        ...log[1],
        messageId: mockMessageId,
        receivedDate: dates.end.toISOString(),
        content: `${mockExceptionMessage} ${mockExceptionStackTrace}`,
        externalCorrelationId: mockCorrelationId,
        caseId: mockPTIURN,
        events: [log[1].events[0], event3]
      }
    ]

    let callNum = -1
    mockFetch.mockImplementation(() => {
      callNum += 1
      return Promise.resolve(updateMockLog.slice(callNum))
    })

    const useCase = new SendReportUseCase(mockEmailer)
    const result = await useCase.execute(new Date())

    dates.end.setHours(dates.end.getHours() + 1) // reset date
    expect(mockEmailer.sendMail).toHaveBeenCalledWith({
      attachments: [
        {
          content: mockContent,
          filename: `bichard7-error-report-${dates.start.toISOString()}.csv`
        }
      ],
      from: "no-reply@mail.bichard7.service.justice.gov.uk",
      subject: "Bichard 7 Common Platform Error Report",
      text: `Between the dates ${dates.start} and ${dates.end} there were 2 errors reported in Bichard`,
      to: "moj-bichard7@madetech.cjsm.net"
    })
    expect(result).toBeTruthy()
  })
})
