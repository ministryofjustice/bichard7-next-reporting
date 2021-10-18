import type AuditLogEvent from "./AuditLogEvent"

export default interface AuditLog {
  messageId: string
  caseId: string
  events: AuditLogEvent[]
  status: string
  lastEventType: string
  version: number
  externalCorrelationId: string
  receivedDate: string
  messageXml: string
}
