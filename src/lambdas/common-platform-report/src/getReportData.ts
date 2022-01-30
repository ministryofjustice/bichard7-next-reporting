import type { DynamoGateway } from "@bichard/dynamo-gateway"
import type { AuditLog, AuditLogEvent, PromiseResult, Result } from "@bichard/types"
import { isError } from "@bichard/types"
import type { DocumentClient } from "aws-sdk/clients/dynamodb"
import config from "./config"
import type { TimeRange } from "./generateDates"

export type ReportRecord = {
  messageId: string
  externalCorrelationId: string
  receivedDate: string
  ptiurn: string
  error: string
}

const extractError = (events: AuditLogEvent[]): string => {
  const errorEvents = events.filter((e) => e.eventType.startsWith("Message Rejected"))
  if (errorEvents.length > 0) {
    const message = errorEvents[0].attributes["Exception Message"] || "Exception message not found"
    const stackTrace = (
      (errorEvents[0].attributes["Exception Stack Trace"] as string) || "Exception stack trace not found"
    ).split("\n")[0]
    return `${message} (${stackTrace})`
  }
  return "Error details not found"
}

const filterDataFields = (r: AuditLog): ReportRecord => ({
  messageId: r.messageId,
  externalCorrelationId: r.externalCorrelationId,
  receivedDate: r.receivedDate,
  ptiurn: r.caseId,
  error: extractError(r.events)
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
