import { PostgresGateway } from "@bichard/postgres-gateway"
import { isError } from "@bichard/types"
import checkConnection from "./checkConnection"
import generateReport from "./generateReport"
import config from "./lib/config"
import saveReport from "./saveReport"

interface MpsReportResult {
  report?: string
  error?: string
}

export default async (): Promise<MpsReportResult> => {
  console.log(" -!- Starting function ...")
  const gateway = new PostgresGateway(config.database)

  console.log(" -!- Checking connection ...")
  const preCheck = await checkConnection(gateway)
  if (isError(preCheck)) {
    return {
      error: preCheck.message
    }
  }
  console.log(" -+- Connection successful ...")

  console.log(" -!- Generating report ...")
  const report = await generateReport(gateway)
  if (isError(report)) {
    return {
      error: report.message
    }
  }
  console.log(" -+- Report generated ...")

  console.log(" -!- Saving report ...")
  const saveResult = await saveReport(gateway, '01', report)
  if (isError(saveResult)) {
    return {
      error: saveResult.message
    }
  }

  return Promise.resolve({
    report: "Saved successfuly"
  })
}
