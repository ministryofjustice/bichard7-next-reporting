import getLastMonthDates from "./getLastMonthDates"

describe("getLastMonthDates", () => {
  it("should generate the correct dates", () => {
    const now = new Date("2021-12-21T18:50:26.123Z")
    const result = getLastMonthDates(now)
    expect(result.start.toISOString()).toBe("2021-11-01T00:00:00.000Z")
    expect(result.end.toISOString()).toBe("2021-11-30T23:59:59.999Z")
  })

  it("should generate the correct dates for Jan", () => {
    const now = new Date("2021-02-21T18:50:26.123Z")
    const result = getLastMonthDates(now)
    expect(result.start.toISOString()).toBe("2021-01-01T00:00:00.000Z")
    expect(result.end.toISOString()).toBe("2021-01-31T23:59:59.999Z")
  })

  it("should generate the handle dates for BST", () => {
    const now = new Date("2021-07-21T18:50:26.123Z")
    const result = getLastMonthDates(now)
    expect(result.start.toISOString()).toBe("2021-05-31T23:00:00.000Z")
    expect(result.end.toISOString()).toBe("2021-06-30T22:59:59.999Z")
  })
})
