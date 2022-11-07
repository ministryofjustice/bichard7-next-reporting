import getErrorName from "./getErrorName"

it("should return the error name when error code exists in resources", () => {
  const errorName = getErrorName("HO100304")

  expect(errorName).toBe("Court offences do not match with what is on the PNC")
})

it("should not return the error name when error code does not exist in resources", () => {
  const errorName = getErrorName("INVALID_CODE")

  expect(errorName).toBeNull()
})
