/* eslint-disable no-console */
import { fetchReportRecordsParallel } from "@bichard/shared"
import { isError } from "@bichard/types"
import * as AWS from "aws-sdk"
import config from "./config"
import generateReport from "./generateReport"
import getLastMonthDates from "./getLastMonthDates"

interface AutomationReportResult {
  report?: string
  error?: string
}

const s3 = new AWS.S3(config.s3)

export default async (): Promise<AutomationReportResult> => {
  const dates = getLastMonthDates(new Date())

  console.log(`Getting messages from ${dates.start.toISOString()} to ${dates.end.toISOString()}`)
  const messagesForReport = await fetchReportRecordsParallel("automationReport", dates, config.api)

  if (isError(messagesForReport)) {
    return {
      error: messagesForReport.message
    }
  }

  console.log("Generating report ...")
  const report = generateReport(dates.start, messagesForReport)
  if (isError(report)) {
    return {
      error: report.message
    }
  }

  console.log("Uploading to S3 ...")
  const params = {
    Bucket: config.reportsBucket,
    Key: config.reportName,
    Body: report
  }

  const result = await s3
    .upload(params)
    .promise()
    .then(() => undefined)
    .catch((error) => <Error>error)

  if (isError(result)) {
    throw result as Error
  }

  return {
    report: "Upload succeeded"
  }
}
