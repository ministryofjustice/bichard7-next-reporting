const region = (process.env.AWS_REGION = "local")
process.env.S3_REGION = region
const accessKeyId = (process.env.S3_AWS_ACCESS_KEY_ID = "S3RVER")
const secretAccessKey = (process.env.S3_AWS_SECRET_ACCESS_KEY = "S3RVER")
process.env.DYNAMO_AWS_ACCESS_KEY_ID = "test"
process.env.DYNAMO_AWS_SECRET_ACCESS_KEY = "test"
const s3Port = 21001
const endpoint = (process.env.S3_ENDPOINT = `http://localhost:${s3Port}`)
const reportsBucket = (process.env.REPORTS_BUCKET = "testBucket")
import { HeadObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { generateDayIntervals } from "@bichard/shared"
import { MockS3 } from "@bichard/testing"
import type { AuditLog, Interval } from "@bichard/types"
import { MockServer } from "jest-mock-server"
import messages from "../test/dummyMessages"
import getLastMonthDates from "./getLastMonthDates"
import handler from "./index"

describe("End to end testing the automation report", () => {
  let s3Server: MockS3
  let apiServer: MockServer

  beforeAll(async () => {
    apiServer = new MockServer({ port: 20001 })
    await apiServer.start()
    s3Server = new MockS3(s3Port, reportsBucket)
    await s3Server.start()
  })

  afterAll(async () => {
    await apiServer.stop()
    await s3Server.stop()
  })

  beforeEach(async () => {
    const previousMonth = new Date()
    previousMonth.setMonth(previousMonth.getMonth() - 1)
    const dummyMessages = messages(previousMonth)
    await apiServer.reset()
    await s3Server.reset()
    const mockEndpoint = apiServer.get("/messages")

    const dates = getLastMonthDates(new Date())
    const intervals = generateDayIntervals(dates)
    let dayCounter = 0
    const dummyMessagesByDay = dummyMessages.reduce((acc: AuditLog[][], msg: AuditLog) => {
      if (acc[dayCounter] === undefined) {
        acc[dayCounter] = []
      }
      acc[dayCounter].push(msg)
      dayCounter += 1
      if (dayCounter == intervals.length) {
        dayCounter = 0
      }
      return acc
    }, [])
    intervals.forEach((_: Interval, index: number) =>
      mockEndpoint
        .mockImplementationOnce((ctx) => {
          ctx.status = 200
          ctx.body = JSON.stringify(dummyMessagesByDay[index])
        })
        .mockImplementationOnce((ctx) => {
          ctx.status = 200
          ctx.body = JSON.stringify([])
        })
    )
  })

  it("should put the correct report in S3", async () => {
    const result = await handler()
    expect(result).toEqual({
      report: "Upload succeeded"
    })
    const client = new S3Client({ region, endpoint, credentials: { accessKeyId, secretAccessKey } })
    const command = new HeadObjectCommand({ Bucket: reportsBucket, Key: "reports/TopExceptions.xlsx" })
    const response = await client.send(command)
    expect(response).toBeDefined()
    expect(response.ContentLength).toBeGreaterThan(300)
  })
})
