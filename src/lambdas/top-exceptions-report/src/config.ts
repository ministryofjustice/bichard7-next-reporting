import type { ApiConfig, S3Config } from "@bichard/types"

export type TopExceptionsReportConfig = {
  api: ApiConfig
  s3: S3Config
  reportsBucket: string
}

type S3Credentails = {
  accessKeyId?: string
  secretAccessKey?: string
}

const s3Credentials: S3Credentails = {}
if (process.env.S3_AWS_ACCESS_KEY_ID) {
  s3Credentials.accessKeyId = process.env.S3_AWS_ACCESS_KEY_ID
}
if (process.env.S3_AWS_ACCESS_KEY_ID) {
  s3Credentials.secretAccessKey = process.env.S3_AWS_ACCESS_KEY_ID
}

const config: TopExceptionsReportConfig = {
  api: {
    apiUrl: process.env.API_URL ?? "http://localhost:20001",
    apiKey: process.env.API_KEY ?? "test-key"
  },
  s3: {
    endpoint: process.env.S3_ENDPOINT ?? "https://s3.eu-west-2.amazonaws.com",
    region: process.env.S3_REGION ?? "eu-west-2",
    s3ForcePathStyle: true,
    ...s3Credentials
  },
  reportsBucket: process.env.REPORTS_BUCKET ?? "bichard-7-testing-reporting-files"
}

export default config
