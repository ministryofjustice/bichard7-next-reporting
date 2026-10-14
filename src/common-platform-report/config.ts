import type { SmtpConfig } from "./getEmailer"
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm"

export interface CommonPlatformReportConfig {
  smtp: SmtpConfig
  fromAddress: string
  toAddresses: string
  timePeriodHours: number
  apiUrl: string
  apiKey: string
}

async function getConfigValue(rawValue: string | undefined, defaultValue: string) {
  let ssm = new SSMClient({ region: process.env.AWS_REGION })

  if (!rawValue) {
    console.log("No value specified, using default")
    return defaultValue
  }

  if (!rawValue.startsWith("arn:aws:ssm")) {
    console.log("Using raw value from environment variable")
    return rawValue
  }

  let command = new GetParameterCommand({
    Name: rawValue,
    WithDecryption: true
  })

  let response = await ssm.send(command)
  if (!response.Parameter?.Value) {
    throw new Error("Failed to read parameter from SSM")
  }

  return response.Parameter.Value
}

export default async function getConfig(): Promise<CommonPlatformReportConfig> {
  return {
    smtp: {
      host: process.env.SMTP_HOST ?? "console",
      user: process.env.SMTP_USER ?? "bichard",
      password: await getConfigValue(process.env.SMTP_PASSWORD, "password"),
      port: parseInt(process.env.SMTP_PORT ?? "587", 10),
      tls: process.env.SMTP_TLS === "true",
      debug: process.env.SMTP_DEBUG === "true"
    },
    fromAddress: process.env.FROM_ADDRESS ?? "no-reply@mail.bichard7.service.justice.gov.uk",
    timePeriodHours: parseInt(process.env.TIME_PERIOD_HOURS ?? "12", 10),
    toAddresses: process.env.TO_ADDRESSES ?? "moj-bichard7@madetech.cjsm.net",
    apiUrl: process.env.API_URL ?? "http://localhost:20001",
    apiKey: await getConfigValue(process.env.API_KEY, "test-key")
  }
}
