import { HeadObjectCommand, S3Client, CreateBucketCommand } from "@aws-sdk/client-s3"
import { MockServer } from "jest-mock-server"
import { generateDayIntervals } from "src/shared"
import type { AuditLog, Interval } from "src/shared/types"
import getLastMonthDates from "./getLastMonthDates"
import messages from "./test/dummyMessages"

const region = (process.env.AWS_REGION = "eu-west-2")
process.env.S3_REGION = region
const accessKeyId = (process.env.S3_AWS_ACCESS_KEY_ID = "test")
const secretAccessKey = (process.env.S3_AWS_SECRET_ACCESS_KEY = "test")
const endpoint = (process.env.S3_ENDPOINT = "http://localhost:4566")
const reportsBucket = (process.env.REPORTS_BUCKET = "testbucket")

import handler from "./index"

describe("End to end testing the automation report", () => {
  let apiServer: MockServer
  let s3Client: S3Client

  beforeAll(async () => {
    apiServer = new MockServer({ port: 20001 })
    await apiServer.start()

    s3Client = new S3Client({
      region,
      endpoint,
      credentials: { accessKeyId, secretAccessKey },
      forcePathStyle: true
    })

    try {
      await s3Client.send(new CreateBucketCommand({ Bucket: reportsBucket }))
    } catch {
      console.log("Bucket creation skipped (may already exist)")
    }
  })

  afterAll(async () => {
    await apiServer.stop()
    s3Client.destroy()
  })

  beforeEach(async () => {
    const previousMonth = new Date()
    previousMonth.setMonth(previousMonth.getMonth() - 1)
    const dummyMessages = messages(previousMonth)
    await apiServer.reset()

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

    const command = new HeadObjectCommand({ Bucket: reportsBucket, Key: "reports/AutomationRate.xlsx" })
    const response = await s3Client.send(command)
    expect(response).toBeDefined()
    expect(response.ContentLength).toBeGreaterThan(100)
  })
})
