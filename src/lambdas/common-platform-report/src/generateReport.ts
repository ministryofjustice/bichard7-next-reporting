import { stringify } from "csv-stringify/sync"
import type { ReportRecord } from "./getReportData"

export default (records: ReportRecord[]): string => {
  const report = [
    ["Received Date", "Internal Message ID", "External Correlation ID", "PTIURN", "Error Message"]
  ].concat(records.map((r) => [r.receivedDate, r.messageId, r.externalCorrelationId, r.ptiurn, r.error]))
  return stringify(report)
}
