import generateReport from "./generateReport"
import { ReportRecord } from "./getReportData"

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
  it("should generate the correct report", async () => {
    const report = generateReport(dummyRecords)
    expect(report).toEqual("")
  })
})