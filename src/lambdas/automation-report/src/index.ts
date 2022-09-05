/* eslint-disable no-console */
import { AwsAuditLogDynamoGateway, createDynamoDbConfig } from "@bichard/dynamo-gateway"
import { isError } from "@bichard/types"
import type { S3Config } from "@bichard/types"
import * as AWS from "aws-sdk"
import generateReport from "./generateReport"
import getLastMonthDates from "./getLastMonthDates"

interface AutomationReportResult {
  report?: string
  error?: string
}

const dynamoConfig = createDynamoDbConfig()
const auditLogGateway = new AwsAuditLogDynamoGateway(dynamoConfig, dynamoConfig.AUDIT_LOG_TABLE_NAME)
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

export default async (): Promise<AutomationReportResult> => {
  const dates = getLastMonthDates(new Date())

  console.log(`Getting messages from ${dates.start.toLocaleString()} ... `)
  const messagesForReport = await auditLogGateway.fetchAllByReceivedDate(dates.start, dates.end)

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
    Bucket: process.env.REPORTS_BUCKET ?? "bichard-7-testing-reporting-files",
    Key: "reports/AutomationRate.xlsx",
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
