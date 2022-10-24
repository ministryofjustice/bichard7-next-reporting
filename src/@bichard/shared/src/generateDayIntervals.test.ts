import generateDayIntervals from "./generateDayIntervals"

describe("generateDayIntervals", () => {
  it("should generate day intervals", () => {
    const start = new Date("2020-02-01T00:00:00Z")
    const end = new Date("2020-02-03T00:00:00Z")
    const result = generateDayIntervals({ start, end })
    expect(result).toStrictEqual([
      {
        start: new Date("2020-02-01T00:00:00.000Z"),
        end: new Date("2020-02-02T00:00:00.000Z")
      },
      {
        start: new Date("2020-02-02T00:00:00.000Z"),
        end: new Date("2020-02-03T00:00:00.000Z")
      }
    ])
  })

  it("should generate day intervals when the dates do not align to the interval", () => {
    const start = new Date("2020-02-01T00:00:00Z")
    const end = new Date("2020-02-02T12:00:00Z")
    const result = generateDayIntervals({ start, end })
    expect(result).toStrictEqual([
      {
        start: new Date("2020-02-01T00:00:00.000Z"),
        end: new Date("2020-02-02T00:00:00.000Z")
      },
      {
        start: new Date("2020-02-02T00:00:00.000Z"),
        end: new Date("2020-02-02T12:00:00.000Z")
      }
    ])
  })

  it("should generate day intervals when the dates are less than the interval", () => {
    const start = new Date("2020-02-01T00:00:00Z")
    const end = new Date("2020-02-01T12:00:00Z")
    const result = generateDayIntervals({ start, end })
    expect(result).toStrictEqual([
      {
        start: new Date("2020-02-01T00:00:00.000Z"),
        end: new Date("2020-02-01T12:00:00.000Z")
      }
    ])
  })
})
