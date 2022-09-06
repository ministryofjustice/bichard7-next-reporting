import type { AuditLog, AuditLogEvent, PromiseResult } from "@bichard/types"
import { isError } from "@bichard/types"
import fetchReportRecords from "./fetchReportRecords"
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
      (event.eventSourceQueueName === "COURT_RESULT_INPUT_QUEUE" &&
        event.eventType === "Court Result Input Queue Failure") ||
      event.eventType.startsWith("Message Rejected")
  )

const filterByDate = (time: TimeRange) => (record: AuditLog) =>
  new Date(record.receivedDate) > time.start && new Date(record.receivedDate) < time.end

const processRecords = (records: AuditLog[], time: TimeRange): ReportRecord[] =>
  records
    .filter(filterCommonPlatformResults)
    .filter(filterCourtResultQueueFailures)
    .filter(filterByDate(time))
    .map(filterDataFields)

const recursivelyFetchRecords = async (
  time: TimeRange,
  records: AuditLog[],
  paginateId?: string
): Promise<AuditLog[]> => {
  const results = await fetchReportRecords(paginateId)

  if (isError(results)) {
    return results
  }

  const lastRecord = results?.slice(-1)[0]

  const matches = results?.filter(filterByDate(time))

  const recordOutsideTimeRange = new Date(lastRecord?.receivedDate) < time.start

  const isOldestRecordInDb = lastRecord?.messageId === paginateId

  const noMoreMatches = !matches.length && records?.length

  if (noMoreMatches || recordOutsideTimeRange || isOldestRecordInDb) {
    //bail out conditions
    return [...matches, ...records]
  }

  return recursivelyFetchRecords(time, [...matches, ...records], lastRecord?.messageId) // paginate and fetch more
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
