/* eslint-disable no-console */
import { AwsAuditLogDynamoGateway, createDynamoDbConfig } from "@bichard/dynamo-gateway"
import { isError } from "@bichard/types"
import type { S3Config } from "@bichard/types"
import * as AWS from "aws-sdk"
import generateReport from "./generateReport"
import getLastMonthDates from "./getLastMonthDates"

interface TopExceptionsReportResult {
  report?: string
  error?: string
}

const config = createDynamoDbConfig()
const auditLogGateway = new AwsAuditLogDynamoGateway(config, config.AUDIT_LOG_TABLE_NAME)

export default async (): Promise<TopExceptionsReportResult> => {
  const dates = getLastMonthDates(new Date())

  console.log("Getting messages ...")
  const messagesForReport = await auditLogGateway.fetchAllByReceivedDate(dates.start, dates.end)

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
  const s3Config: S3Config = {
    endpoint: process.env.S3_ENDPOINT ?? "https://s3.eu-west-2.amazonaws.com",
    region: process.env.S3_REGION ?? "eu-west-2",
    s3ForcePathStyle: true
  }
  if (process.env.S3_AWS_ACCESS_KEY_ID) {
    s3Config.accessKeyId = process.env.S3_AWS_ACCESS_KEY_ID
  }
  if (process.env.S3_AWS_ACCESS_KEY_ID) {
    s3Config.secretAccessKey = process.env.S3_AWS_ACCESS_KEY_ID
  }

  const s3 = new AWS.S3(s3Config)

  const params = {
    Bucket: process.env.REPORTS_BUCKET ?? "bichard-7-testing-reporting-files", // pass your bucket name
    Key: "reports/TopExceptions.xlsx",
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
