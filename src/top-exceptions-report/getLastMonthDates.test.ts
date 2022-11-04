import getLastMonthDates from "./getLastMonthDates"

describe("getLastMonthDates", () => {
  it("should generate the correct dates", () => {
    const now = new Date("2021-12-21T18:50:26.123Z")
    const result = getLastMonthDates(now)
    expect(result.start.toISOString()).toBe("2021-11-01T00:00:00.000Z")
    expect(result.end.toISOString()).toBe("2021-12-01T00:00:00.000Z")
  })

  it("should generate the correct dates for January", () => {
    const now = new Date("2021-01-21T18:50:26.123Z")
    const result = getLastMonthDates(now)
    expect(result.start.toISOString()).toBe("2020-12-01T00:00:00.000Z")
    expect(result.end.toISOString()).toBe("2021-01-01T00:00:00.000Z")
  })
})
