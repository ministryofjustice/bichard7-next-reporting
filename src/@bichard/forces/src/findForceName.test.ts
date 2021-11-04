import findForceName from "./findForceName"

it("should return the force name when force code exists", () => {
  const forceOwner = "0014FS"

  const result = findForceName(forceOwner)

  expect(result).toBe("South Yorkshire")
})

it("should return undefined when force code does not exist", () => {
  const forceOwner = "__--__"

  const result = findForceName(forceOwner)

  expect(result).toBeUndefined()
})
