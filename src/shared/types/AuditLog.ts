import type AuditLogEvent from "./AuditLogEvent"
import type AutomationReport from "./AutomationReport"
import type TopExceptionsReport from "./TopExceptionsReport"

export default interface AuditLog {
  messageId: string
  caseId: string
  systemId: string
  events: AuditLogEvent[]
  automationReport?: AutomationReport
  topExceptionsReport?: TopExceptionsReport
  status: string
  lastEventType: string
  version: number
  externalCorrelationId: string
  receivedDate: string
  messageXml?: string
  forceOwner?: number
}
