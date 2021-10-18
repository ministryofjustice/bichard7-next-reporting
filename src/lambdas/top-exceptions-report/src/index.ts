import { AwsAuditLogDynamoGateway, createDynamoDbConfig } from "@bichard/dynamo-gateway"
import { isError } from "@bichard/types"
import generateReport from "./generateReport"

interface TopExceptionsReportResult {
  report?: string
  error?: string
}

interface TopExceptionsReportInput {
  from: string
  to: string
}

const config = createDynamoDbConfig()
const auditLogGateway = new AwsAuditLogDynamoGateway(config, config.AUDIT_LOG_TABLE_NAME)

export default async ({ from, to }: TopExceptionsReportInput): Promise<TopExceptionsReportResult> => {
  const messagesForReport = await auditLogGateway.fetchAllByReceivedDate(new Date(from), new Date(to))

  if (isError(messagesForReport)) {
    return {
      error: messagesForReport.message
    }
  }

  const report = generateReport(messagesForReport)

  return Promise.resolve({
    report
  })
}
