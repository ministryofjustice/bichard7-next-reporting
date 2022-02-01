/* eslint-disable no-console */
import { AwsAuditLogDynamoGateway, createDynamoDbConfig } from "@bichard/dynamo-gateway"
import { isError } from "@bichard/types"
import * as AWS from "aws-sdk"
import generateReport from "./generateReport"

interface AutomationReportResult {
  report?: string
  error?: string
}

const config = createDynamoDbConfig()
const auditLogGateway = new AwsAuditLogDynamoGateway(config, config.AUDIT_LOG_TABLE_NAME)

export default async (): Promise<AutomationReportResult> => {
  const previousMonth = new Date()
  previousMonth.setDate(1)
  previousMonth.setMonth(previousMonth.getMonth() - 1)
  console.log(`Getting messages from ${previousMonth.toLocaleString()} ... `)
  const messagesForReport = await auditLogGateway.fetchAllByReceivedDate(previousMonth, new Date())

  if (isError(messagesForReport)) {
    return {
      error: messagesForReport.message
    }
  }

  console.log("Generating report ...")
  const report = generateReport(previousMonth, messagesForReport)
  if (isError(report)) {
    return {
      error: report.message
    }
  }

  console.log("Uploading to S3 ...")
  const s3 = new AWS.S3({
    endpoint: "https://s3.eu-west-2.amazonaws.com",
    region: "eu-west-2",
    s3ForcePathStyle: true
  })

  const params = {
    Bucket: process.env.REPORTS_BUCKET ?? "bichard-7-testing-reporting-files", // pass your bucket name
    Key: "reports/AutomationRage.xls",
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
