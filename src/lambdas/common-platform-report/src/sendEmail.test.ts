import { TimeRange } from "./generateDates"
import { ReportRecord } from "./getReportData"
process.env.AWS_URL = 'dummy'
process.env.AWS_REGION = 'dummy'
process.env.AUDIT_LOG_TABLE_NAME = "bichard-7-production-audit-log"
import sendEmail from './sendEmail'

const dummyRecords: ReportRecord[] = [
  {
    messageId: "1",
    externalCorrelationId: "CID-1",
    receivedDate: "2021-12-21T18:55:27.000Z",
    ptiurn: "XYZ12345",
    error: "Error message"
  },
  {
    messageId: "2",
    externalCorrelationId: "CID-2",
    receivedDate: "2021-12-21T18:55:28.000Z",
    ptiurn: "XYZ12346",
    error: "Error message 2"
  }
]

describe("sendEmail", () => {
  it("Should correctly generate the report and send the email", async () => {
    const mockEmailer = { sendMail: jest.fn(() => Promise.resolve()) }
    const range: TimeRange = { start: new Date('2022-01-28T05:00:00'), end: new Date('2022-01-28T17:00:00') }
    const result = await sendEmail(mockEmailer, range, dummyRecords)
    expect(mockEmailer.sendMail).toHaveBeenCalledWith({
      "attachments": [
        {
          "content": `Received Date,Internal Message ID,External Correlation ID,PTIURN,Error Message\n2021-12-21T18:55:27.000Z,1,CID-1,XYZ12345,Error message\n2021-12-21T18:55:28.000Z,2,CID-2,XYZ12346,Error message 2\n`,
          "filename": "bichard7-error-report-2022-01-28T05:00:00.000Z.csv",
        },
      ],
      "from": "no-reply@mail.bichard7.service.justice.gov.uk",
      "subject": "Bichard 7 Common Platform Error Report",
      "text": "Between the dates Fri Jan 28 2022 05:00:00 GMT+0000 (Greenwich Mean Time) and Fri Jan 28 2022 17:00:00 GMT+0000 (Greenwich Mean Time) there were 2 errors reported in Bichard",
      "to": "moj-bichard7@madetech.cjsm.net",
    })
    expect(result).toBeTruthy()
  })
})