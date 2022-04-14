import type { AuditLog, AuditLogEvent, PromiseResult } from "@bichard/types"
import fetchReportRecords from "./fetchReportRecords"
import { isError } from "@bichard/types"

import type { TimeRange } from "./generateDates"

export type ReportRecord = {
  messageId: string
  externalCorrelationId: string
  receivedDate: string
  ptiurn: string
  error: string
}

export type ApiConfig = {
  apiUrl: string
  apiKey: string
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

const filterCommonPlatformResults = (r: AuditLog): boolean => /C00CommonPlatform/i.test(r.systemId)

const filterCourtResultQueueFailures = (r: AuditLog): boolean =>
  r.events.some(
    (event) =>
      event.eventSourceQueueName === "COURT_RESULT_INPUT_QUEUE" &&
      event.eventType === "Court Result Input Queue Failure"
  )

const filterByDate = (time: TimeRange) => (record: AuditLog) =>
  new Date(record.receivedDate) > time.start && new Date(record.receivedDate) < time.end

const processRecords = (records: AuditLog[], time: TimeRange): ReportRecord[] =>
  records
    .filter(filterCommonPlatformResults)
    .filter(filterCourtResultQueueFailures)
    .filter(filterByDate(time))
    .map(filterDataFields)

const recursivelyFetchRecords = async (time: TimeRange, records: AuditLog[]): Promise<AuditLog[]> => {
  // we need to filter by date here in case there are records which don't fit our date range
  // records are batched by 10
  const lastRecord = records.filter(filterByDate(time)).slice(-1)[0]

  // fetch records based on last record with matching date
  if (lastRecord && new Date(lastRecord?.receivedDate) > time.start) {
    return fetchReportRecords(lastRecord.messageId)
  }

  // use the previous receivedDate to paginate and fetch more
  const results = await fetchReportRecords(records.length ? records.slice(-1)[0].messageId : undefined)

  // if there are no errors in the specified time period
  if (!results.length && records.length) {
    return results
  }

  return recursivelyFetchRecords(time, results)
}

export default async (timeRange: TimeRange): PromiseResult<ReportRecord[]> => {
  console.log(timeRange)
  const results = await recursivelyFetchRecords(timeRange, [])
  if (isError(results)) {
    console.log("ERROR: getting results from api gateway")
    return results
  }
  return processRecords(results, timeRange)
}
