const dynamoUrl = (process.env.AWS_URL = `http://localhost:20001`)
const region = (process.env.AWS_REGION = "local")
process.env.S3_REGION = region
const accessKeyId = (process.env.S3_AWS_ACCESS_KEY_ID = "S3RVER")
const secretAccessKey = (process.env.S3_AWS_SECRET_ACCESS_KEY = "S3RVER")
process.env.DYNAMO_AWS_ACCESS_KEY_ID = "test"
process.env.DYNAMO_AWS_SECRET_ACCESS_KEY = "test"
const auditLogTable = (process.env.AUDIT_LOG_TABLE_NAME = "auditLogTable")
const s3Port = 21001
const endpoint = (process.env.S3_ENDPOINT = `http://localhost:${s3Port}`)
const reportsBucket = (process.env.REPORTS_BUCKET = "testBucket")
import handler from "./index"
import { MockDynamo } from "@bichard/testing"
import { MockS3 } from "@bichard/testing"
import type { DynamoDbConfig } from "@bichard/dynamo-gateway"
import { AwsAuditLogDynamoGateway } from "@bichard/dynamo-gateway"
import messages from "../test/dummyMessages"
import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3"

const config: DynamoDbConfig = {
  DYNAMO_URL: dynamoUrl,
  DYNAMO_REGION: "test",
  AUDIT_LOG_TABLE_NAME: auditLogTable,
  AWS_ACCESS_KEY_ID: "test",
  AWS_SECRET_ACCESS_KEY: "test"
}

describe("End to end testing the automation report", () => {
  let dynamoServer: MockDynamo
  let s3Server: MockS3

  beforeAll(async () => {
    dynamoServer = new MockDynamo()
    await dynamoServer.start(20001)
    s3Server = new MockS3(s3Port, reportsBucket)
    await s3Server.start()
  })

  afterAll(async () => {
    await dynamoServer.stop()
    await s3Server.stop()
  })

  beforeEach(async () => {
    const previousMonth = new Date()
    previousMonth.setMonth(previousMonth.getMonth() - 1)
    const dummyMessages = messages(previousMonth)
    await dynamoServer.setupTable()
    const auditLogGateway = new AwsAuditLogDynamoGateway(config, config.AUDIT_LOG_TABLE_NAME)
    for (const log of dummyMessages) {
      await auditLogGateway.insertOne(config.AUDIT_LOG_TABLE_NAME, log, "messageId")
    }
    await s3Server.reset()
  })

  it("should put the correct report in S3", async () => {
    const result = await handler()
    expect(result).toEqual({
      report: "Upload succeeded"
    })
    const client = new S3Client({ region, endpoint, credentials: { accessKeyId, secretAccessKey } })
    const command = new HeadObjectCommand({ Bucket: reportsBucket, Key: "reports/TopExceptions.xls" })
    const response = await client.send(command)
    expect(response).toBeDefined()
    expect(response.ContentLength).toBeGreaterThan(300)
  })
})
