import jwt from "jsonwebtoken"
import { randomUUID } from "crypto"

export type JWTServiceDetails = {
  emailAddress: string
  groups: string[]
  username: string
}

const jwtSignOptions: jwt.SignOptions = {
  expiresIn: "10m", // 10 minutes
  issuer: process.env.TOKEN_ISSUER ?? "Bichard",
  jwtid: randomUUID()
}

export const newJwt = (tokenSecret: string, serviceDetails: JWTServiceDetails): Error | string =>
  jwt.sign(serviceDetails, tokenSecret, jwtSignOptions)
