import generateReport from "./generateReport"
import messages from "../test/dummyMessages"

it("should generate the correct report", () => {
  const report = generateReport(messages(new Date("2021-10-14T14:08:00.000Z")))

  expect(report).toMatchSnapshot()
})
