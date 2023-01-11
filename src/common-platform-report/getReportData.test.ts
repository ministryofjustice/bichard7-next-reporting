process.env.AWS_URL = "dummy"
process.env.AWS_REGION = "dummy"
process.env.AUDIT_LOG_TABLE_NAME = "bichard-7-production-audit-log"
import fetchReportRecords from "./fetchReportRecords"
import getReportData from "./getReportData"
import { log } from "./test/mocks/fetchApiGatewayResponse"

jest.mock("./fetchReportRecords")

const mockFetch = fetchReportRecords as jest.MockedFunction<typeof fetchReportRecords>

const startTime = new Date("2022-01-03T04:00:00.000Z")
const endTime = new Date("2022-01-04T05:00:00.000Z")

describe("getReportData", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should extract the correct fields from records which match the specified time range and only include relevant exceptions", async () => {
    let callNum = 0
    // mock the recursive call
    mockFetch.mockImplementation(() => {
      callNum += 1
      return Promise.resolve(log.slice(callNum - 1, callNum))
    })

    const result = await getReportData({ start: startTime, end: endTime })
    expect(mockFetch).toHaveBeenCalledTimes(6)
    expect(result).toEqual([
      {
        error: "The XML Converter encountered an Error during message UnMarshalling (Line 1)",
        externalCorrelationId: "externalId-4",
        messageId: "message-4",
        ptiurn: "caseId-4",
        receivedDate: "2022-01-03T04:00:00.000Z"
      },
      {
        error: "The XML Converter encountered an Error during message UnMarshalling (Line 1)",
        externalCorrelationId: "externalId-3",
        messageId: "message-3",
        ptiurn: "caseId-3",
        receivedDate: "2022-01-03T04:00:00.000Z"
      },
      {
        error: "The XML Converter encountered an Error during message UnMarshalling (Line 1)",
        externalCorrelationId: "externalId-2",
        messageId: "message-2",
        ptiurn: "caseId-2",
        receivedDate: "2022-01-04T04:00:00.000Z"
      }
    ])
  })

  it("should retrieve matches from a response when the last record in the array of results is outside of the time range", async () => {
    // mock the recursive call
    mockFetch.mockImplementation(() => {
      return Promise.resolve(log.slice())
    })

    const startDate = new Date("2022-01-01T05:00:00.000Z")
    const endDate = new Date("2022-01-03T04:00:00.000Z")

    const result = await getReportData({ start: startDate, end: endDate })
    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(result).toEqual([
      {
        error: "The XML Converter encountered an Error during message UnMarshalling (Line 1)",
        externalCorrelationId: "externalId-5",
        messageId: "message-5",
        ptiurn: "caseId-5",
        receivedDate: "2022-01-02T04:00:00.000Z"
      }
    ])
  })

  it("should paginate when matching records span multiple api responses for a time period in the past", async () => {
    let callNum = 0
    // mock the recursive call
    mockFetch.mockImplementation(() => {
      callNum += 1
      return Promise.resolve(log.slice(callNum - 1, callNum))
    })

    const startDate = new Date("2022-01-02T04:00:00.000Z")
    const endDate = new Date("2022-01-05T04:00:00.000Z")

    const result = await getReportData({ start: startDate, end: endDate })
    expect(mockFetch).toHaveBeenCalledTimes(7)
    expect(result).toEqual([
      {
        error: "The XML Converter encountered an Error during message UnMarshalling (Line 1)",
        externalCorrelationId: "externalId-5",
        messageId: "message-5",
        ptiurn: "caseId-5",
        receivedDate: "2022-01-02T04:00:00.000Z"
      },
      {
        error: "The XML Converter encountered an Error during message UnMarshalling (Line 1)",
        externalCorrelationId: "externalId-4",
        messageId: "message-4",
        ptiurn: "caseId-4",
        receivedDate: "2022-01-03T04:00:00.000Z"
      },
      {
        error: "The XML Converter encountered an Error during message UnMarshalling (Line 1)",
        externalCorrelationId: "externalId-3",
        messageId: "message-3",
        ptiurn: "caseId-3",
        receivedDate: "2022-01-03T04:00:00.000Z"
      },
      {
        error: "The XML Converter encountered an Error during message UnMarshalling (Line 1)",
        externalCorrelationId: "externalId-2",
        messageId: "message-2",
        ptiurn: "caseId-2",
        receivedDate: "2022-01-04T04:00:00.000Z"
      }
    ])
  })

  it("should paginate when matching records span multiple api responses", async () => {
    let callNum = 0
    // mock the recursive call
    mockFetch.mockImplementation(() => {
      callNum += 1
      return Promise.resolve(log.slice(callNum - 1, callNum))
    })

    const startDate = new Date("2022-01-02T04:00:00.000Z")

    const result = await getReportData({ start: startDate, end: new Date() })
    expect(mockFetch).toHaveBeenCalledTimes(7)
    expect(result).toEqual([
      {
        error: "The XML Converter encountered an Error during message UnMarshalling (Line 1)",
        externalCorrelationId: "externalId-5",
        messageId: "message-5",
        ptiurn: "caseId-5",
        receivedDate: "2022-01-02T04:00:00.000Z"
      },
      {
        error: "The XML Converter encountered an Error during message UnMarshalling (Line 1)",
        externalCorrelationId: "externalId-4",
        messageId: "message-4",
        ptiurn: "caseId-4",
        receivedDate: "2022-01-03T04:00:00.000Z"
      },
      {
        error: "The XML Converter encountered an Error during message UnMarshalling (Line 1)",
        externalCorrelationId: "externalId-3",
        messageId: "message-3",
        ptiurn: "caseId-3",
        receivedDate: "2022-01-03T04:00:00.000Z"
      },
      {
        error: "The XML Converter encountered an Error during message UnMarshalling (Line 1)",
        externalCorrelationId: "externalId-2",
        messageId: "message-2",
        ptiurn: "caseId-2",
        receivedDate: "2022-01-04T04:00:00.000Z"
      },
      {
        error: "The XML Converter encountered an Error during message UnMarshalling (Line 1)",
        externalCorrelationId: "externalId-1",
        messageId: "message-1",
        ptiurn: "caseId-1",
        receivedDate: "2022-01-05T04:00:00.000Z"
      }
    ])
  })

  it("should handle when there are no messages for the specified date range", async () => {
    let callNum = 0
    mockFetch.mockImplementation(() => {
      callNum += 1
      return Promise.resolve(log.slice(callNum - 1, callNum))
    })

    const startDate = new Date()
    startDate.setHours(startDate.getHours() - 1)

    const result = await getReportData({ start: startDate, end: new Date() })
    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(result).toEqual([])
  })

  it("should handle when there are no messages for the specified date range but the time range is a long time ago", async () => {
    let callNum = 0
    mockFetch.mockImplementation(() => {
      callNum += 1
      return Promise.resolve(log.slice(callNum - 1, callNum))
    })

    const startDate = new Date("January 02, 1970 11:13:00")
    const endDate = new Date("January 02, 1970 12:13:00")

    const result = await getReportData({ start: startDate, end: endDate })
    expect(mockFetch).toHaveBeenCalledTimes(9)
    expect(result).toEqual([])
  })
})
