import type { AxiosError } from "axios"
import axios from "axios"
import type { ApiConfig, AuditLog, Interval, PromiseResult } from "src/shared/types"
import { isError } from "src/shared/types"
import { generateDayIntervals } from "."

const pageLimit = 500

const fetchReportRecordsPage = (
  report: string,
  { start, end }: Interval,
  config: ApiConfig,
  lastMessageId?: string,
  attempts = 10
): PromiseResult<AuditLog[]> => {
  let lastMessageIdQuery = ""
  if (lastMessageId) {
    lastMessageIdQuery = `&lastMessageId=${lastMessageId}`
  }
  const startTime = new Date().getTime()
  const url = `${
    config.apiUrl
  }/messages?eventsFilter=${report}&start=${start.toISOString()}&end=${end.toISOString()}&limit=${pageLimit}${lastMessageIdQuery}`
  return axios
    .get<AuditLog[]>(url, {
      headers: { "X-API-Key": config.apiKey }
    })
    .then((result) => {
      // console.log("Page succeeded: ", url)
      return result.data
    })
    .catch((e: AxiosError) => {
      if (e.response?.status === 504 && attempts > 0) {
        console.error(
          "Request timed out. Duration: ",
          (new Date().getTime() - startTime) / 1000,
          "attempts: ",
          attempts
        )
        return fetchReportRecordsPage(report, { start, end }, config, lastMessageId, attempts - 1)
      }
      console.error("Fetching page failed: ", url)
      return e
    })
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
