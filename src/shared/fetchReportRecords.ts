import axios from "axios"
import type { ApiConfig, AuditLog, Interval, PromiseResult } from "src/shared/types"
import { isError } from "src/shared/types"
import { generateDayIntervals } from "."

const fetchReportRecordsPage = (
  report: string,
  { start, end }: Interval,
  config: ApiConfig,
  lastMessageId?: string
): PromiseResult<AuditLog[]> => {
  let lastMessageIdQuery = ""
  if (lastMessageId) {
    lastMessageIdQuery = `&lastMessageId=${lastMessageId}`
  }
  return axios
    .get<AuditLog[]>(
      `${
        config.apiUrl
      }/messages?eventsFilter=${report}&start=${start.toISOString()}&end=${end.toISOString()}&limit=999999999${lastMessageIdQuery}`,
      {
        headers: { "X-API-Key": config.apiKey }
      }
    )
    .then((result) => result.data)
    .catch((e: Error) => e)
}

const fetchReportRecords = async (report: string, interval: Interval, config: ApiConfig): Promise<AuditLog[]> => {
  let lastMessageId: string | undefined = undefined
  let records: AuditLog[] = []
  while (true) {
    const fetchResult: AuditLog[] | Error = await fetchReportRecordsPage(report, interval, config, lastMessageId)

    if (isError(fetchResult)) {
      throw fetchResult as Error
    }
    if (fetchResult.length === 0) {
      return records
    }
    lastMessageId = fetchResult[fetchResult.length - 1].messageId
    records = records.concat(fetchResult)
  }
}

export const fetchReportRecordsParallel = async (
  report: string,
  interval: Interval,
  config: ApiConfig
): PromiseResult<AuditLog[]> => {
  // Break up the time period into chunks
  const chunks = generateDayIntervals(interval)
  const promises = chunks.map((chunk) => fetchReportRecords(report, chunk, config))
  const result = await Promise.all(promises)
  return result.flat(1)
}

export default fetchReportRecords
