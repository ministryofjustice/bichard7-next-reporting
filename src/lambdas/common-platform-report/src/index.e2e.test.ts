process.env.AWS_URL = `http://localhost:20001`
process.env.AWS_REGION = "local"
process.env.DYNAMO_AWS_ACCESS_KEY_ID = "test"
process.env.DYNAMO_AWS_SECRET_ACCESS_KEY = "test"
process.env.AUDIT_LOG_TABLE_NAME = "auditLogTable"
process.env.SMTP_HOST = "localhost"
process.env.SMTP_PORT = "20002"
process.env.SMTP_TLS = "false"
import { AwsAuditLogDynamoGateway } from "@bichard/dynamo-gateway"
import { MockDynamo } from "@bichard/testing"
import type { AuditLog } from "@bichard/types"
import { AuditLogEvent, isError } from "@bichard/types"
import MockMailServer from "../test/MockMailServer"
import handler from "./index"

describe("End to end testing the lambda", () => {
  let mailServer: MockMailServer
  let dynamoServer: MockDynamo

  beforeAll(async () => {
    dynamoServer = new MockDynamo()
    await dynamoServer.start(20001)
    mailServer = new MockMailServer(20002)
  })

  afterAll(async () => {
    mailServer.stop()
    await dynamoServer.stop()
  })

  beforeEach(async () => {
    await dynamoServer.setupTable()

    const config = {
      DYNAMO_URL: "http://localhost:20001",
      DYNAMO_REGION: "test",
      AUDIT_LOG_TABLE_NAME: "auditLogTable",
      AWS_ACCESS_KEY_ID: "test",
      AWS_SECRET_ACCESS_KEY: "test"
    }
    const auditLogGateway = new AwsAuditLogDynamoGateway(config, config.AUDIT_LOG_TABLE_NAME)
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

    const log: AuditLog = {
      messageId: "message-1",
      caseId: "caseId-1",
      systemId: "C00CommonPlatform",
      status: "Error",
      version: 1,
      externalCorrelationId: "externalId-1",
      receivedDate: new Date("2022-01-03T16:02:00.000Z").toISOString(),
      events: [event1, event2],
      lastEventType: "Court Result Input Queue Failure",
      automationReport: { events: [] },
      topExceptionsReport: { events: [] }
    }
    await auditLogGateway.insertOne(config.AUDIT_LOG_TABLE_NAME, log, "messageId")
  })

  it("should email the report", async () => {
    await handler(new Date("2022-01-05T17:01:00.000Z"))
    const mail = await mailServer.getEmail("moj-bichard7@madetech.cjsm.net")
    if (isError(mail)) {
      throw mail
    }

    expect(mail.body).toMatch(/Between the dates .* and .* there were 1 errors reported in Bichard/)
    expect(mail.attachments).toHaveLength(1)
    expect(mail.attachments[0].filename).toMatch(/bichard7-error-report-.*.csv/)
    expect(mail.attachments[0].content.toString().trim()).toBe(
      `Received Date,Internal Message ID,External Correlation ID,PTIURN,Error Message\n2022-01-03T16:02:00.000Z,message-1,externalId-1,caseId-1,Something crashed (Line 1)`
    )
  })

  it("should not email the report if is the wrong hour", async () => {
    const result = await handler(new Date("2022-01-05T14:01:00.000Z"))
    expect(result).toStrictEqual({ report: "Skipping sending report" })
  })
})
