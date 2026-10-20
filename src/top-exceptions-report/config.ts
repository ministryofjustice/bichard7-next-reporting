import type { ApiConfig, S3Config } from "src/shared/types"
import getConfigValue from "../shared/getConfigValue"
import type { SSMClient } from "@aws-sdk/client-ssm"

export type TopExceptionsReportConfig = {
  api: ApiConfig
  s3: S3Config
  reportsBucket: string
  reportName: string
}

export default async function getConfig(ssm: SSMClient): Promise<TopExceptionsReportConfig> {
  return {
    api: {
      apiUrl: process.env.API_URL ?? "http://localhost:20001",
      apiKey: await getConfigValue(ssm, process.env.API_KEY, "test-key")
    },
    s3: {
      endpoint: process.env.S3_ENDPOINT ?? "https://s3.eu-west-2.amazonaws.com",
      region: process.env.S3_REGION ?? "eu-west-2",
      s3ForcePathStyle: true
    },
    reportsBucket: process.env.REPORTS_BUCKET ?? "bichard-7-testing-reporting-files",
    reportName: process.env.REPORT_NAME ?? "reports/TopExceptions.xlsx"
  }
}
