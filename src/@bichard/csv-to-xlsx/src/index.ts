import type { KeyValuePair } from "@bichard/types"
import { parse } from "csv-parse/sync"
import xlsx from "xlsx-js-style"

const csvOptions = {
  columns: true,
  delimiter: ",",
  ltrim: true,
  rtrim: true
}

const createTitleCell = (title: string) => ({
  v: title,
  t: "s",
  s: {
    font: {
      name: "Arial",
      sz: 14
    },
    alignment: {
      horizontal: "center"
    }
  }
})

const createHeaderCell = (header: string) => ({
  v: header,
  t: "s",
  s: {
    font: {
      name: "Arial",
      bold: true
    }
  }
})
const createCell = (cellValue: string) => ({
  v: cellValue,
  s: {
    font: {
      name: "Arial"
    }
  }
})
const calculateColumnWidths = (records: KeyValuePair<string, string>[]): { width: number }[] => {
  const columnWidths = Object.keys(records[0] ?? {}).map((key) => key.length)

  records.forEach((record) => {
    Object.values(record).forEach((value, index) => {
      columnWidths[index] = value.length > columnWidths[index] ? value.length : columnWidths[index]
    })
  })

  return columnWidths.map((width) => ({ width }))
}

const convertCsvToXlsx = (csvData: string, title?: string): Buffer => {
  const records = parse(csvData, csvOptions) as KeyValuePair<string, string>[]
  const wb = xlsx.utils.book_new()
  let jsonRows = []
  if (title) {
    jsonRows.push([createTitleCell(title)])
  }

  if (records.length > 0) {
    jsonRows.push(Object.keys(records[0]).map(createHeaderCell))
  }

  jsonRows = [
    ...jsonRows,
    ...records.map((record) =>
      Object.values(record).map((value, index) => (index === 0 ? createHeaderCell(value) : createCell(value)))
    )
  ]

  const ws = xlsx.utils.aoa_to_sheet(jsonRows)
  if (title) {
    const numberOfColumns = Object.keys(records?.[0] ?? {}).length
    ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: numberOfColumns - 1 } }]
  }
  ws["!cols"] = calculateColumnWidths(records)

  xlsx.utils.book_append_sheet(wb, ws)

  return xlsx.write(wb, { type: "buffer" })
}

export default convertCsvToXlsx
