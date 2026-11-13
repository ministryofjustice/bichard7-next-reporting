import { toIsoDate } from "./toIsoDate"

describe("toIsoDate", () => {
  it("should format a Date object into a YYYY-MM-DD string", () => {
    const testDate = new Date("2026-11-04")

    const result = toIsoDate(testDate)

    expect(result).toBe("2026-11-04")
  })
})
