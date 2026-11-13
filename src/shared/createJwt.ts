import jwtServiceGenerator from "../shared/jwtServiceGenerator"
import { isError } from "./types"

export const createJwt = (): string => {
  if (!process.env.AUTH_JWT_SECRET) {
    throw new Error("AUTH_JWT_SECRET: environment variable must be set")
  }

  const jwt = jwtServiceGenerator(process.env.AUTH_JWT_SECRET, {
    emailAddress: "moj-bichard7@madetech.com",
    groups: ["Service"],
    username: "comunity-sentence-report"
  })

  if (isError(jwt)) {
    throw jwt
  }

  return `Bearer ${jwt}`
}
