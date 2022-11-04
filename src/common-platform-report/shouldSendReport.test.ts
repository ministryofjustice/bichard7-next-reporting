import shouldSendReport from "./shouldSendReport"

describe("shouldSendReport", () => {
  it("should return true if the time matches a valid hour in London in winter", () => {
    const now = new Date("2022-01-05T17:00:00.000Z")
    const result = shouldSendReport(now, [5, 17])
    expect(result).toBe(true)
  })

  it("should return true if the time matches a valid hour in London in summer", () => {
    const now = new Date("2022-08-05T16:00:00.000Z")
    const result = shouldSendReport(now, [5, 17])
    expect(result).toBe(true)
  })
})
