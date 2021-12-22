import { AwsAuditLogDynamoGateway, createDynamoDbConfig } from "@bichard/dynamo-gateway"
import { isError } from "@bichard/types"
import generateReport from "./generateReport"

interface TopExceptionsReportResult {
  report?: string
  error?: string
}

const config = createDynamoDbConfig()
const auditLogGateway = new AwsAuditLogDynamoGateway(config, config.AUDIT_LOG_TABLE_NAME)

export default async (): Promise<TopExceptionsReportResult> => {
  let previousMonth = new Date()
  previousMonth.setDate(1);
  previousMonth.setMonth(previousMonth.getMonth()-1);
  const messagesForReport = await auditLogGateway.fetchAllByReceivedDate(previousMonth, new Date())

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
