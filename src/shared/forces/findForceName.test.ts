import findForceName from "./findForceName"

it("should return the force name when force code exists", () => {
  const forceOwner = 54

  const result = findForceName(forceOwner)

  expect(result).toBe("Wiltshire")
})

it("should return undefined when force code does not exist", () => {
  const forceOwner = 909

  const result = findForceName(forceOwner)

  expect(result).toBeUndefined()
})
