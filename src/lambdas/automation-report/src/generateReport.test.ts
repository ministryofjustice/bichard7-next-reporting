import generateReport from "./generateReport"
import messages from "../test/dummyMessages"

it("should generate the correct report", () => {
  const report = generateReport(new Date("2022-01-04T15:23:43.567Z"), messages(new Date("2021-10-29T10:34:00.000Z")))

  expect(report.toString()).toMatchSnapshot()
})
