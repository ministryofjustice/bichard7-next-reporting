import { DynamoGateway } from "@bichard/dynamo-gateway"
process.env.AWS_URL = 'dummy'
process.env.AWS_REGION = 'dummy'
process.env.AUDIT_LOG_TABLE_NAME = "bichard-7-production-audit-log"
import config from "./config"
import getReportData from "./getReportData"
import mockDynamoReponse from "../test/mocks/dynamoResponse.json"

const startTime = new Date("2021-12-22T04:29:11.123Z")
const endTime = new Date("2021-12-22T16:29:11.123Z")

describe("getReportData", () => {
  let gateway: DynamoGateway

  beforeEach(() => {
    gateway = new DynamoGateway(config.dynamo)
  })

  it("should query Dynamo correctly", async () => {
    const mockQuery = jest.fn()
    gateway.fetchByIndex = mockQuery
    mockQuery.mockReturnValueOnce({})
    await getReportData(gateway, { start: startTime, end: endTime })
    expect(gateway.fetchByIndex).toHaveBeenCalledWith("bichard-7-production-audit-log", {
      attributeName: "status",
      attributeValue: "Error",
      indexName: "statusIndex",
      pagination: { limit: 100 },
      rangeKeyBetween: ["2021-12-22T04:29:11.123Z", "2021-12-22T16:29:11.123Z"],
      rangeKeyName: "receivedDate"
    })
  })

  it("should extract the correct fields from the Dynamo record", async () => {
    const mockQuery = jest.fn()
    gateway.fetchByIndex = mockQuery
    mockQuery.mockReturnValueOnce(mockDynamoReponse)
    const result = await getReportData(gateway, { start: startTime, end: endTime })
    expect(result).toEqual([
      {
        error:
          "The XML Converter encountered an Error during message UnMarshalling (uk.gov.ocjr.mtu.br7.ho.pub.choreography.exception.MessageParsingException: The XML Converter encountered an Error during message UnMarshalling)",
        externalCorrelationId: "CID-e633db32-b2d0-4a0c-b108-4e102084ba28",
        messageId: "af0d20f1-0fa6-4d52-a3f6-3c35d0e00f26",
        ptiurn: "01VK1600008",
        receivedDate: "2021-12-17T13:36:00.000Z"
      }
    ])
  })
})
