import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm"
import type DatabaseConfig from "./DatabaseConfig"

export interface UserServiceConfig {
  database: DatabaseConfig
}

async function getPassword() {
  let ssm = new SSMClient({ region: process.env.AWS_REGION })

  let configPassword = process.env.DB_PASSWORD
  if (!configPassword) {
    console.log("No password specified, using placeholder")
    return "password"
  }

  if (!configPassword.startsWith("arn:aws:ssm")) {
    console.log("Using raw password from environment variable")
    return configPassword
  }

  let command = new GetParameterCommand({
    Name: configPassword,
    WithDecryption: true
  })

  let passwordResponse = await ssm.send(command)
  if (!passwordResponse.Parameter?.Value) {
    throw new Error("Failed to read password from SSM")
  }

  return passwordResponse.Parameter.Value
}

export default async function getConfig(): Promise<UserServiceConfig> {
  return {
    database: {
      host: process.env.DB_HOST ?? process.env.DB_AUTH_HOST ?? "localhost",
      user: process.env.DB_USER ?? process.env.DB_AUTH_USER ?? "bichard",
      password: await getPassword(),
      database: process.env.DB_DATABASE ?? process.env.DB_AUTH_DATABASE ?? "bichard",
      port: parseInt(process.env.DB_PORT ?? process.env.DB_AUTH_PORT ?? "5432", 10),
      ssl: (process.env.DB_SSL ?? process.env.DB_AUTH_SSL) === "true"
    }
  }
}
