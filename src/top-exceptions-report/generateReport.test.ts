import generateReport from "./generateReport"
import messages from "./test/dummyMessages"
import type { TimeRange } from "./getLastMonthDates"
import { subMonths } from "date-fns"

it("should generate the correct report", () => {
  const timeRange: TimeRange = {
    start: subMonths(new Date("2021-10-14T14:08:00.000Z"), 1),
    end: new Date("2021-10-14T14:08:00.000Z")
  }

  const report = generateReport(messages(new Date("2021-10-14T14:08:00.000Z")), timeRange)

  expect(report.toString()).toMatchSnapshot()
})
