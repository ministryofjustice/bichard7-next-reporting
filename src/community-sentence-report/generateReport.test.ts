import { generateReport } from "./generateReport"
import { communitySentenceReportRecords } from "./test/dummyMessages"

it("generates the report", () => {
  const period = { start: new Date("2026-09-30T23:00:00.000Z"), end: new Date("2026-11-01T00:00:00.000Z") }
  const report = generateReport(communitySentenceReportRecords, period)

  expect(report.toString()).toMatchSnapshot()
})
