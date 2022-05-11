jest.setTimeout(30000)
process.env.AWS_URL = `http://localhost:20001`
process.env.AWS_REGION = "local"
process.env.DYNAMO_AWS_ACCESS_KEY_ID = "test"
process.env.DYNAMO_AWS_SECRET_ACCESS_KEY = "test"
process.env.AUDIT_LOG_TABLE_NAME = "auditLogTable"
process.env.SMTP_HOST = "localhost"
process.env.SMTP_PORT = "20002"
process.env.SMTP_TLS = "false"
import { isError } from "@bichard/types"
import MockMailServer from "../test/MockMailServer"
import { log } from "../test/mocks/fetchApiGatewayResponse"
import handler from "./index"
import { MockServer } from "jest-mock-server"

const mockResponse = (status: number, body: string) => (ctx: any) => {
  ctx.status = status
  ctx.body = body
}

describe("End to end testing the lambda", () => {
  let mailServer: MockMailServer
  let apiGatewayServer: MockServer

  beforeAll(async () => {
    apiGatewayServer = new MockServer({ port: 20001 })
    await apiGatewayServer.start()
    mailServer = new MockMailServer(20002)
  })

  afterAll(async () => {
    mailServer.stop()
    await apiGatewayServer.stop()
    jest.clearAllMocks()
  })

  beforeEach(async () => {
    await apiGatewayServer.reset()
    apiGatewayServer.get(/.*/).mockImplementation(mockResponse(200, JSON.stringify(log)))
  })

  it("should email the report", async () => {
    await handler(new Date("2022-01-04T05:00:00.000Z"))
    const mail = await mailServer.getEmail("moj-bichard7@madetech.cjsm.net")
    if (isError(mail)) {
      throw mail
    }

    expect(mail.body).toMatch(/Between the dates .* and .* there were 1 errors reported in Bichard/)
    expect(mail.attachments).toHaveLength(1)
    expect(mail.attachments[0].filename).toMatch(/bichard7-error-report-.*.csv/)
    expect(mail.attachments[0].content.toString().trim()).toBe(
      `Received Date,Internal Message ID,External Correlation ID,PTIURN,Error Message\n2022-01-04T04:00:00.000Z,message-2,externalId-2,caseId-2,Something crashed (Line 1)`
    )
  })

  it("should not email the report if is the wrong hour", async () => {
    const result = await handler(new Date("2022-01-05T14:01:00.000Z"))
    expect(result).toStrictEqual({ report: "Skipping sending report" })
  })
})
