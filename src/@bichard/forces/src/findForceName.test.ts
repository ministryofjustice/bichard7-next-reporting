import findForceName from "./findForceName"

it("should return the force name when force code exists", () => {
  const forceOwner = "540000"

  const result = findForceName(forceOwner)

  expect(result).toBe("Wiltshire")
})

it("should return undefined when force code does not exist", () => {
  const forceOwner = "__--__"

  const result = findForceName(forceOwner)

  expect(result).toBeUndefined()
})
