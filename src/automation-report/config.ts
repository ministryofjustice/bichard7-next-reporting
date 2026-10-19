import type { ApiConfig } from "../shared/types"

export type AutomationReportConfig = {
  api: ApiConfig
  reportsBucket: string
  reportName: string
  writeToFile: boolean
}

const config: AutomationReportConfig = {
  api: {
    apiUrl: process.env.API_URL ?? "http://localhost:20001",
    apiKey: process.env.API_KEY ?? "test-key"
  },
  reportsBucket: process.env.REPORTS_BUCKET ?? "bichard-7-testing-reporting-files",
  reportName: process.env.REPORT_NAME ?? "reports/AutomationRate.xlsx",
  writeToFile: process.env.WRITE_TO_FILE === "true"
}

export default config
