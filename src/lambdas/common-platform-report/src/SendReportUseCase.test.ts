process.env.AWS_URL = "dummy"
process.env.AWS_REGION = "dummy"
process.env.AUDIT_LOG_TABLE_NAME = "bichard-7-production-audit-log"
process.env.TIME_PERIOD_HOURS = "12"
import type { DynamoGateway } from "@bichard/dynamo-gateway"
import SendReportUseCase from "./SendReportUseCase"
import dynamoResponse from "../test/mocks/dynamoResponse.json"
import generateDates from "./generateDates"

describe("SendReportUseCase", () => {
  it("Should correctly generate the report and send the email", async () => {
    const mockEmailer = { sendMail: jest.fn(() => Promise.resolve()) }
    const dates = generateDates(new Date(), 12)
    const mockDynamoGateway: DynamoGateway = {
      fetchByIndex: jest.fn(() => Promise.resolve(dynamoResponse))
    } as unknown as DynamoGateway
    const useCase = new SendReportUseCase(mockDynamoGateway, mockEmailer)
    const result = await useCase.execute()
    expect(mockEmailer.sendMail).toHaveBeenCalledWith({
      attachments: [
        {
          content: `Received Date,Internal Message ID,External Correlation ID,PTIURN,Error Message\n2021-12-17T13:36:00.000Z,af0d20f1-0fa6-4d52-a3f6-3c35d0e00f26,CID-e633db32-b2d0-4a0c-b108-4e102084ba28,01VK1600008,The XML Converter encountered an Error during message UnMarshalling (uk.gov.ocjr.mtu.br7.ho.pub.choreography.exception.MessageParsingException: The XML Converter encountered an Error during message UnMarshalling)\n`,
          filename: `bichard7-error-report-${dates.start.toISOString()}.csv`
        }
      ],
      from: "no-reply@mail.bichard7.service.justice.gov.uk",
      subject: "Bichard 7 Common Platform Error Report",
      text: `Between the dates ${dates.start} and ${dates.end} there were 1 errors reported in Bichard`,
      to: "moj-bichard7@madetech.cjsm.net"
    })
    expect(result).toBeTruthy()
  })
})
