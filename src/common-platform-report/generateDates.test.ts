import generateDates from "./generateDates"

describe("generateDates", () => {
  it("should generate the correct times", () => {
    const now = new Date("2021-12-21T18:50:26.123Z")
    const result = generateDates(now, 12)
    expect(result.end.toISOString()).toBe("2021-12-21T18:00:00.000Z")
    expect(result.start.toISOString()).toBe("2021-12-21T06:00:00.000Z")
  })
})
