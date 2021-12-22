import generateDates from "./generateDates"

describe("generateDates", () => {
  it("should generate the correct times", async () => {
    const now = new Date("2021-12-21T18:50:26.123Z")
    const result = generateDates(now, 12)
    expect(result.end.toISOString()).toEqual("2021-12-21T18:00:00.000Z")
    expect(result.start.toISOString()).toEqual("2021-12-21T06:00:00.000Z")
  })
})
