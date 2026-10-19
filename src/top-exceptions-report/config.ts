import type { ApiConfig } from "src/shared/types"

export type TopExceptionsReportConfig = {
  api: ApiConfig
  reportsBucket: string
  reportName: string
}

export default function getConfig(): TopExceptionsReportConfig {
  return {
    api: {
      apiUrl: process.env.API_URL ?? "http://localhost:20001",
      apiKey: process.env.API_KEY ?? "test-key"
    },
    reportsBucket: process.env.REPORTS_BUCKET ?? "bichard-7-testing-reporting-files",
    reportName: process.env.REPORT_NAME ?? "reports/TopExceptions.xlsx"
  }
}
