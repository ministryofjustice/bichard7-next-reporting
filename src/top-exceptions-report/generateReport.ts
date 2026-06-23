import { stringify } from "csv-stringify/sync"
import convertCsvToXlsx from "src/shared/csv-to-xlsx"
import { findForceName } from "src/shared/forces"
import type { AuditLog, KeyValuePair } from "src/shared/types"
import getErrorName from "./errorNames/getErrorName"
import type { TimeRange } from "./getLastMonthDates"
import { formatInTimeZone } from "date-fns-tz"

type ForceExceptions = KeyValuePair<string, number>
type ForcesExceptions = KeyValuePair<string, ForceExceptions>

const getAttributesWithErrors = (messages: AuditLog[]): KeyValuePair<string, unknown>[] => {
  return messages
    .filter(
      (message) => message.events && message.events.some((e) => e.attributes && "Error 1 Details" in e.attributes)
    )
    .map((message) => {
      const { events, forceOwner } = message
      for (let i = 0; i < events.length; i += 1) {
        if (forceOwner !== undefined && events[i].attributes) {
          events[i].attributes["Force Owner"] = forceOwner
        }
      }
      return events
    })
    .reduce((allEvents, topExceptionsReportEvents) => allEvents.concat(topExceptionsReportEvents), [])
    .map((event) => event.attributes ?? {})
}

const calculateForcesExceptions = (allAttributes: KeyValuePair<string, unknown>[]): ForcesExceptions => {
  return allAttributes.reduce((forces: ForcesExceptions, attributes) => {
    const forceNumber = attributes["Force Owner"] as number
    const forceName = findForceName(forceNumber) ?? "National"
    const forceExceptions = forces[forceName] || {}

    Object.keys(attributes)
      .filter((attributeName) => attributeName.match(/Error.*Details/))
      .forEach((key) => {
        const exceptionCode = (attributes[key] as string).split("||")[0]
        forceExceptions[exceptionCode] = (forceExceptions[exceptionCode] || 0) + 1
      })

    forces[forceName] = forceExceptions
    return forces
  }, {}) as ForcesExceptions
}

const generateCsv = (forcesExceptions: ForcesExceptions, dates: TimeRange): string[][] => {
  const startDateFormatted = formatInTimeZone(dates.start, "Europe/London", "dd/MM/yyyy")
  const endDateFormatted = formatInTimeZone(dates.end, "Europe/London", "dd/MM/yyyy")

  const rows = [
    [`Bichard 7 Top Exceptions - ${startDateFormatted} to ${endDateFormatted}`],
    ["Force", "Exception", "Error Text", "Count"]
  ]

  Object.keys(forcesExceptions).forEach((forceName) => {
    const forceExceptions = forcesExceptions[forceName]
    Object.keys(forceExceptions).forEach((exceptionCode) => {
      const errorText = getErrorName(exceptionCode)
      rows.push([`${forceName}`, `${exceptionCode}`, `${errorText}`, `${forceExceptions[exceptionCode]}`])
    })
  })

  return rows
}

export default (messages: AuditLog[], dates: TimeRange): Buffer => {
  const attributesWithErrors = getAttributesWithErrors(messages)

  const forcesExceptions = calculateForcesExceptions(attributesWithErrors)

  const csvResult = generateCsv(forcesExceptions, dates)

  const title = csvResult.shift()?.[0]
  const xlsxResult = convertCsvToXlsx(stringify(csvResult), title)

  return xlsxResult
}
