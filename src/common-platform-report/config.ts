import type { SmtpConfig } from "./getEmailer"

export interface CommonPlatformReportConfig {
  smtp: SmtpConfig
  fromAddress: string
  toAddresses: string
  timePeriodHours: number
  apiUrl: string
  apiKey: string
}

const config: CommonPlatformReportConfig = {
  smtp: {
    host: process.env.SMTP_HOST ?? "console",
    user: process.env.SMTP_USER ?? "bichard",
    password: process.env.SMTP_PASSWORD ?? "password",
    port: parseInt(process.env.SMTP_PORT ?? "587", 10),
    tls: process.env.SMTP_TLS === "true",
    debug: process.env.SMTP_DEBUG === "true"
  },
  fromAddress: process.env.FROM_ADDRESS ?? "no-reply@mail.bichard7.service.justice.gov.uk",
  timePeriodHours: parseInt(process.env.TIME_PERIOD_HOURS ?? "12", 10),
  toAddresses: process.env.TO_ADDRESSES ?? "moj-bichard7@madetech.cjsm.net",
  apiUrl: process.env.API_URL ?? "http://localhost:20001",
  apiKey: process.env.API_KEY ?? "test-key"
}

export default config
