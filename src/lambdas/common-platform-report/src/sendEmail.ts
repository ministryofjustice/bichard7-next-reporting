import { isError, PromiseResult } from "@bichard/types"
import config from "./config"
import { TimeRange } from "./generateDates"
import generateReport from "./generateReport"
import { ReportRecord } from "./getReportData"
import Email from "./types/Email"
import Emailer from "./types/Emailer"

export default async (emailer: Emailer, range: TimeRange, records: ReportRecord[]): PromiseResult<boolean> => {
  const options: Email = {
    to: config.toAddresses,
    from: config.fromAddress,
    subject: "Bichard 7 Common Platform Error Report",
    text: `Between the dates ${range.start} and ${range.end} there were ${records.length} errors reported in Bichard`
  }
  if (records.length > 0) {
    const content = generateReport(records)
    options.attachments = [
      {
        filename: `bichard7-error-report-${range.start.toISOString()}.csv`,
        content
      }
    ]
  }

  const result = await emailer.sendMail(options).catch((err: Error) => err)

  if (isError(result)) {
    console.error("Error sending email", result.message)
    return result
  }
  return true
}
