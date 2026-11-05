import type { Interval } from "src/shared/types"
import { communitySentenceColumns } from "./columns"
import { toIsoDate } from "src/shared/toIsoDate"
import convertCsvToXlsx from "src/shared/csv-to-xlsx"
import type CommunitySentenceReport from "src/shared/types/CommunitySentenceReport"

type ReportColumn<T> = { header: string; key: keyof T }

const escapeCell = (value: unknown): string => {
  const text = value == null ? "" : String(value)
  const safe = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text

  return /[",\r\n]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe
}

const convertRecordsToCsv = <T>(records: T[], columns: ReportColumn<T>[]): string => {
  const headerRow = columns.map(({ header }) => escapeCell(header))
  const dataRows = records.map((record) => columns.map(({ key }) => escapeCell(record[key])))

  return `${[headerRow, ...dataRows].map((row) => row.join(",")).join("\n")}\n`
}

export const generateReport = (records: CommunitySentenceReport[], period: Interval): Buffer => {
  const csv = convertRecordsToCsv(records, communitySentenceColumns)
  const startDate = toIsoDate(period.start)
  const endDate = toIsoDate(period.end)
  const title = `Community Sentence Report ${startDate} to ${endDate}`

  const workbook = convertCsvToXlsx(csv, title)

  return workbook
}
