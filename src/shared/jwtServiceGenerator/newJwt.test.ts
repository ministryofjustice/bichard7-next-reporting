import jwt from "jsonwebtoken"

import { isError } from "../types"
import { newJwt, type JWTServiceDetails } from "./newJwt"

describe("newJwt", () => {
  it("creates a valid JWT token", () => {
    const tokenSecret = "Something"
    const serviceDetails: JWTServiceDetails = {
      emailAddress: "moj-bichard7@madetech.com",
      groups: ["Service"],
      username: "Core-Worker"
    }

    const result = newJwt(tokenSecret, serviceDetails)

    if (isError(result)) {
      throw result
    }

    expect(typeof result).toBe("string")

    const resultJwt = jwt.verify(result, tokenSecret, { issuer: "Bichard" }) as JWTServiceDetails

    expect(resultJwt.emailAddress).toBe("moj-bichard7@madetech.com")
    expect(resultJwt.groups).toEqual(["Service"])
    expect(resultJwt.username).toBe("Core-Worker")
  })

  it("throws an error when the tokenSecret is an empty string", () => {
    const tokenSecret = ""
    const serviceDetails: JWTServiceDetails = {
      emailAddress: "moj-bichard7@madetech.com",
      groups: ["Service"],
      username: "Core-Worker"
    }

    expect(() => {
      newJwt(tokenSecret, serviceDetails)
    }).toThrow("secretOrPrivateKey must have a value")
  })
})
