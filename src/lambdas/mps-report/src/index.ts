import generateReport from "./generateReport"

interface MpsReportResult {
  report?: string
  error?: string
}

export default async (): Promise<MpsReportResult> => {
  const report = await generateReport()

  return Promise.resolve({
    report
  })
}
