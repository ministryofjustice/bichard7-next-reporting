import { createDynamoDbConfig, DynamoDbConfig } from "@bichard/dynamo-gateway"
import { SmtpConfig } from "./getEmailer"

export interface CommonPlatformReportConfig {
  smtp: SmtpConfig
  dynamo: DynamoDbConfig
  fromAddress: string
  toAddresses: string
  timePeriodHours: number
}

const config: CommonPlatformReportConfig = {
  smtp: {
    host: process.env.SMTP_HOST ?? "console",
    user: process.env.SMTP_USER ?? "bichard",
    password: process.env.SMTP_PASSWORD ?? "password",
    port: parseInt(process.env.SMTP_PORT ?? "587", 10),
    tls: process.env.SMTP_TLS === "true"
  },
  dynamo: createDynamoDbConfig(),
  fromAddress: process.env.FROM_ADDRESS ?? "no-reply@mail.bichard7.service.justice.gov.uk",
  timePeriodHours: parseInt(process.env.TIME_PERIOD_HOURS ?? "240", 10),
  toAddresses: process.env.TO_ADDRESSES ?? "moj-bichard7@madetech.com"
}

export default config