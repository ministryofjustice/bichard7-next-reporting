/* eslint-disable no-console */
import * as AWS from "aws-sdk"
import { fetchReportRecordsParallel } from "src/shared"
import { isError } from "src/shared/types"
import config from "./config"
import generateReport from "./generateReport"
import getLastMonthDates from "./getLastMonthDates"
import fs from "fs"

interface AutomationReportResult {
  report?: string
  error?: string
}

const s3 = new AWS.S3(config.s3)

export default async (): Promise<AutomationReportResult> => {
  let date = new Date()
  if (process.env.DATE) {
    date = new Date(process.env.DATE)
    date = new Date(date.setMonth(date.getMonth() + 1))
  }
  const dates = getLastMonthDates(date)

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

  if (config.writeToFile) {
    console.log("Writing to file ...")
    const reportDate = new Date(process.env.DATE || date).toISOString().split("-").slice(0, 2).join("-")
    const reportFileName = `AutomationRate-${reportDate}.xlsx`
    fs.writeFileSync(reportFileName, report)

    return {
      report: `Saved successfully: ${reportFileName}`
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
