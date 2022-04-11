import generateReport from "./generateReport"
import type { ReportRecord } from "./getReportData"

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

describe("generateReport", () => {
  it("should generate the correct report", () => {
    const report = generateReport(dummyRecords)
    expect(report).toBe(
      `Received Date,Internal Message ID,External Correlation ID,PTIURN,Error Message\n2021-12-21T18:55:27.000Z,1,CID-1,XYZ12345,Error message\n2021-12-21T18:55:28.000Z,2,CID-2,XYZ12346,Error message 2\n`
    )
  })
})
