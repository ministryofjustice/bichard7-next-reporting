import { AuditLogEvent } from "@bichard/types"

const event1 = new AuditLogEvent({
  eventType: "Court Result Input Queue Failure",
  eventSource: "foo",
  category: "error",
  timestamp: new Date("2022-01-05T16:01:00.000Z"),
  eventSourceQueueName: "COURT_RESULT_INPUT_QUEUE"
})
const event2 = new AuditLogEvent({
  eventType: "Message Rejected by MDB",
  eventSource: "foo",
  category: "error",
  timestamp: new Date("2022-01-05T16:02:00.000Z")
})
event2.addAttribute("Exception Message", "Something crashed")
event2.addAttribute("Exception Stack Trace", "Line 1\nLine 2\nLine 3")

export const event3 = new AuditLogEvent({
  eventType: "Message Rejected Mock for SendReportUseCase test",
  eventSource: "SendReportUseCase",
  category: "error",
  timestamp: new Date("2021-12-17T13:36:00.000Z")
})

export const log = [
  {
    messageId: "message-1", // this message is before our time range
    caseId: "caseId-1",
    systemId: "C00CommonPlatform",
    status: "Error",
    version: 1,
    externalCorrelationId: "externalId-1",
    receivedDate: new Date("2022-01-02T04:00:00.000Z").toISOString(),
    events: [event1, event2],
    lastEventType: "Court Result Input Queue Failure",
    automationReport: { events: [] },
    topExceptionsReport: { events: [] }
  },
  {
    messageId: "message-2",
    caseId: "caseId-2",
    systemId: "C00CommonPlatform",
    status: "Error",
    version: 1,
    externalCorrelationId: "externalId-2",
    receivedDate: new Date("2022-01-04T04:00:00.000Z").toISOString(),
    events: [event1, event2],
    lastEventType: "Court Result Input Queue Failure",
    automationReport: { events: [] },
    topExceptionsReport: { events: [] }
  },
  {
    messageId: "message-3",
    caseId: "caseId-3",
    systemId: "C00CommonPlatform",
    status: "Error",
    version: 1,
    externalCorrelationId: "externalId-3",
    receivedDate: new Date("2022-01-05T04:00:00.000Z").toISOString(),
    events: [event1, event2],
    lastEventType: "Court Result Input Queue Failure",
    automationReport: { events: [] },
    topExceptionsReport: { events: [] }
  }
]