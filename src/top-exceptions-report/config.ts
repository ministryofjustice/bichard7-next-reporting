import type { ApiConfig, S3Config } from "src/shared/types"
import getConfigValue from "../shared/getConfigValue"
import type { SSMClient } from "@aws-sdk/client-ssm"

export type TopExceptionsReportConfig = {
  api: ApiConfig
  s3: S3Config
  reportsBucket: string
  reportName: string
}

type S3Credentials = {
  accessKeyId?: string
  secretAccessKey?: string
}

export default async function getConfig(ssm: SSMClient): Promise<TopExceptionsReportConfig> {
  const s3Credentials: S3Credentials = {}
  if (process.env.S3_AWS_ACCESS_KEY_ID) {
    s3Credentials.accessKeyId = await getConfigValue(ssm, process.env.S3_AWS_ACCESS_KEY_ID, "")
  }
  if (process.env.S3_AWS_ACCESS_KEY_ID) {
    s3Credentials.secretAccessKey = await getConfigValue(ssm, process.env.S3_AWS_ACCESS_KEY_ID, "")
  }

  return {
    api: {
      apiUrl: process.env.API_URL ?? "http://localhost:20001",
      apiKey: await getConfigValue(ssm, process.env.API_KEY, "test-key")
    },
    s3: {
      endpoint: process.env.S3_ENDPOINT ?? "https://s3.eu-west-2.amazonaws.com",
      region: process.env.S3_REGION ?? "eu-west-2",
      s3ForcePathStyle: true,
      ...s3Credentials
    },
    reportsBucket: process.env.REPORTS_BUCKET ?? "bichard-7-testing-reporting-files",
    reportName: process.env.REPORT_NAME ?? "reports/TopExceptions.xlsx"
  }
}
