import { PostgresGateway } from "@bichard/postgres-gateway"
import { isError } from "@bichard/types/dist/Result"
import generateReport from "./generateReport"
import config from "./lib/config"
import saveReport from "./saveReport"

interface MpsReportResult {
  report?: string
  error?: string
}

export default async (): Promise<MpsReportResult> => {
  const gateway = new PostgresGateway(config.database)
  console.log(" -!- Generating report ...")
  const report = await generateReport(gateway)
  if (isError(report)) {
    return {
      error: report.message
    }
  }

  console.log(" -!- Saving report ...")
  const saveResult = await saveReport(gateway, '01', report)
  if(isError(saveResult)){
    return {
      error: saveResult.message
    }
  }

  return Promise.resolve({
    report: "Saved successfuly"
  })
}
