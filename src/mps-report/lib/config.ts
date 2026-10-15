import type DatabaseConfig from "./DatabaseConfig"
import getConfigValue from "../../shared/getConfigValue"
import { SSMClient } from "@aws-sdk/client-ssm"

export interface UserServiceConfig {
  database: DatabaseConfig
}

export default async function getConfig(): Promise<UserServiceConfig> {
  const ssm = new SSMClient({ region: process.env.AWS_REGION })

  return {
    database: {
      host: process.env.DB_HOST ?? process.env.DB_AUTH_HOST ?? "localhost",
      user: process.env.DB_USER ?? process.env.DB_AUTH_USER ?? "bichard",
      password: await getConfigValue(ssm, process.env.DB_PASSWORD, "password"),
      database: process.env.DB_DATABASE ?? process.env.DB_AUTH_DATABASE ?? "bichard",
      port: parseInt(process.env.DB_PORT ?? process.env.DB_AUTH_PORT ?? "5432", 10),
      ssl: (process.env.DB_SSL ?? process.env.DB_AUTH_SSL) === "true"
    }
  }
}
