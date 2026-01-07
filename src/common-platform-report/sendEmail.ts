import type { PromiseResult } from "src/shared/types"
import { isError } from "src/shared/types"
import config from "./config"
import type { TimeRange } from "./generateDates"
import generateReport from "./generateReport"
import type { ReportRecord } from "./getReportData"
import type Email from "./types/Email"
import type Emailer from "./types/Emailer"

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

  const result = await emailer
    .sendMail(options)
    .then(() => console.log("Email successfully sent"))
    .catch((err: Error) => err)

  if (isError(result)) {
    console.error("Error sending email", result.message)
    return result
  }
  return true
}
