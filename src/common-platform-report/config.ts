import type { SmtpConfig } from "./getEmailer"
import getConfigValue from "../shared/getConfigValue"

export interface CommonPlatformReportConfig {
  smtp: SmtpConfig
  fromAddress: string
  toAddresses: string
  timePeriodHours: number
  apiUrl: string
  apiKey: string
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
