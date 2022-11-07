import getOffenceCode from "./getOffenceCode"

it("should return correct offence code when passing the expected type", () => {
  const input = {
    OffenceReason: {
      OffenceCode: {
        ActOrSource: {
          _text: "SX"
        },
        Year: {
          _text: "03"
        },
        Reason: {
          _text: "001"
        }
      }
    }
  }

  const result = getOffenceCode(input)
  expect(result).toBe("SX03001")
})
