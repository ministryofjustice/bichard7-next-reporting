import { isError } from "@bichard/types/dist/Result"
import generateReport from "./generateReport"

interface MpsReportResult {
  report?: string
  error?: string
}

export default async (): Promise<MpsReportResult> => {
  const report = await generateReport()

  if (isError(report)) {
    return {
      error: report.message
    }
  }
  
  return Promise.resolve({
    report
  })
}
