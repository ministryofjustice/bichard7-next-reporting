import { DynamoGateway } from "@bichard/dynamo-gateway"
import { AuditLog, isError, PromiseResult, Result } from "@bichard/types"
import { DocumentClient } from "aws-sdk/clients/dynamodb"
import config from "./config"
import { TimeRange } from "./generateDates"

export type ReportRecord = {
  messageId: string
  externalCorrelationId: string
  receivedDate: string
  ptiurn: string
  error: string
}

const filterDataFields = (r: AuditLog): ReportRecord => ({
  messageId: r.messageId,
  externalCorrelationId: r.externalCorrelationId,
  receivedDate: r.receivedDate,
  ptiurn: r.caseId,
  error: "Error message"
})

const filterCommonPlatformResults = (r: AuditLog): boolean => !!r.messageXml.match(/C00CommonPlatform/i)

const filterCourtResultQueueFailures = (r: AuditLog): boolean =>
  r.events.some(
    (event) =>
      event.eventSourceQueueName === "COURT_RESULT_INPUT_QUEUE" &&
      event.eventType === "Court Result Input Queue Failure"
  )

const processRecords = (records: AuditLog[]): ReportRecord[] =>
  records.filter(filterCommonPlatformResults).filter(filterCourtResultQueueFailures).map(filterDataFields)

export default async (dynamo: DynamoGateway, timeRange: TimeRange): PromiseResult<ReportRecord[]> => {
  const result: Result<DocumentClient.QueryOutput> = await dynamo.fetchByIndex(config.dynamo.AUDIT_LOG_TABLE_NAME, {
    indexName: "statusIndex",
    attributeName: "status",
    attributeValue: "Error",
    rangeKeyName: "receivedDate",
    rangeKeyBetween: [timeRange.start.toISOString(), timeRange.end.toISOString()],
    pagination: { limit: 100 }
  })
  if (isError(result)) {
    return result
  }
  if (!result.Items) {
    return new Error("No items found")
  }
  return processRecords(result.Items as AuditLog[])
}
