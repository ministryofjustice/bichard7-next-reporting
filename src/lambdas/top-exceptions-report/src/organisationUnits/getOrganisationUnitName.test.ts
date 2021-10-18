import getOrganisationUnitName from "./getOrganisationUnitName"

it("should return the organisation name when organisation unit code exists", () => {
  const result = getOrganisationUnitName("0014FS")

  expect(result).toBe("South Yorkshire Police")
})

it("should return null when error code does not exist", () => {
  const result = getOrganisationUnitName("INVALID_CODE")

  expect(result).toBeNull()
})
