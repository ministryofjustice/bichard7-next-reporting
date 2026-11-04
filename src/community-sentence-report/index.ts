import getLastMonthDates from "src/shared/getLastMonthDates"
import fetchCommunitySentenceReport from "./fetchCommunitySentenceReport"
import getConfig from "./config"
import { isError } from "src/shared/types"

interface SentencingActReportResult {
  report?: string
  error?: string
}

export const handler = async (): Promise<SentencingActReportResult> => {
  const config = getConfig()
  let date = new Date()
  if (process.env.DATE) {
    date = new Date(process.env.DATE)
    date = new Date(date.setMonth(date.getMonth() + 1))
  }
  const dates = getLastMonthDates(date)

  console.log(`Generating report for the period ${dates.start.toISOString()} to ${dates.end.toISOString()}`)
  const report = await fetchCommunitySentenceReport(dates, config.api)

  if (isError(report)) {
    return {
      error: report.message
    }
  }

  return Promise.resolve({
    report: "Upload succeeded"
  })
}
