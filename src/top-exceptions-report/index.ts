import * as AWS from "aws-sdk"
import { fetchReportRecordsParallel } from "src/shared"
import { isError } from "src/shared/types"
import config from "./config"
import generateReport from "./generateReport"
import getLastMonthDates from "./getLastMonthDates"

interface TopExceptionsReportResult {
  report?: string
  error?: string
}

export default async (): Promise<TopExceptionsReportResult> => {
  const dates = getLastMonthDates(new Date())

  console.log("Getting messages ...")
  const messagesForReport = await fetchReportRecordsParallel("topExceptionsReport", dates, config.api)

  if (isError(messagesForReport)) {
    return {
      error: messagesForReport.message
    }
  }

  console.log("Generating report ...")
  const report = generateReport(messagesForReport)
  if (isError(report)) {
    return {
      error: report.message
    }
  }

  console.log("Uploading to S3 ...")
  const s3 = new AWS.S3(config.s3)

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

  return Promise.resolve({
    report: "Upload succeeded"
  })
}
