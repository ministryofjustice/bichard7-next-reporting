import type { AuditLog, PromiseResult } from "@bichard/types"

export default interface AuditLogDynamoGateway {
  fetchAllByReceivedDate(receivedDateFrom: Date, receivedDateTo: Date): PromiseResult<AuditLog[]>
}
