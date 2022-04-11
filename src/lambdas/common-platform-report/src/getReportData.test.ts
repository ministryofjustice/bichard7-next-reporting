process.env.AWS_URL = "dummy"
process.env.AWS_REGION = "dummy"
process.env.AUDIT_LOG_TABLE_NAME = "bichard-7-production-audit-log"
import fetchReportRecords from "./fetchReportRecords"
import getReportData from "./getReportData"
import { log } from "../test/mocks/fetchApiGatewayResponse"

jest.mock("./fetchReportRecords")

const mockFetch = fetchReportRecords as jest.MockedFunction<typeof fetchReportRecords>

const startTime = new Date("2022-01-03T04:00:00.000Z")
const endTime = new Date("2022-01-04T05:00:00.000Z")

describe("getReportData", () => {
  it("should extract the correct fields from the api gateway", async () => {
    let callNum = -1
    mockFetch.mockImplementation(() => {
      callNum += 1
      return Promise.resolve(log.slice(callNum))
    })

    const result = await getReportData({ start: startTime, end: endTime })
    expect(mockFetch).toHaveBeenCalledTimes(2)
    expect(result).toEqual([
      {
        error: "Something crashed (Line 1)",
        externalCorrelationId: "externalId-2",
        messageId: "message-2",
        ptiurn: "caseId-2",
        receivedDate: "2022-01-04T04:00:00.000Z"
      }
    ])
  })
})
