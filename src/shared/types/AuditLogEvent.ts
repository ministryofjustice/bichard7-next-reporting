import type AuditLogEventOptions from "./AuditLogEventOptions"
import type EventCategory from "./EventCategory"
import type KeyValuePair from "./KeyValuePair"

export default class AuditLogEvent {
  public readonly eventSource: string

  public readonly eventSourceQueueName?: string

  public readonly category: EventCategory

  public readonly eventType: string

  public readonly eventCode: string

  public readonly timestamp: string

  public readonly attributes: KeyValuePair<string, unknown> = {}

  constructor(options: AuditLogEventOptions) {
    this.eventSource = options.eventSource
    this.category = options.category
    this.eventType = options.eventType
    this.timestamp = options.timestamp.toISOString()
    this.eventSourceQueueName = options.eventSourceQueueName
  }

  addAttribute(name: string, value: unknown): void {
    this.attributes[name] = value
  }
}
