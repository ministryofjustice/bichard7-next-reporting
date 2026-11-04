import type { S3Config } from "src/shared/types"

// TO BE MOVED
export type ApiConfig = {
  apiUrl: string
}

export type CommunitySentenceReportConfig = {
  api: ApiConfig
  s3: S3Config
  reportsBucket: string
  reportName: string
}

export default function getConfig(): CommunitySentenceReportConfig {
  return {
    api: {
      apiUrl: process.env.API_URL ?? "http://localhost:20001"
    },
    s3: {
      endpoint: process.env.S3_ENDPOINT ?? "https://s3.eu-west-2.amazonaws.com",
      region: process.env.S3_REGION ?? "eu-west-2",
      s3ForcePathStyle: true
    },
    reportsBucket: process.env.REPORTS_BUCKET ?? "bichard-7-testing-reporting-files",
    reportName: process.env.REPORT_NAME ?? "reports/CommunitySentenceReport.xlsx"
  }
}
