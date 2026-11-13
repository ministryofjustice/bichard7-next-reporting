import type CommunitySentenceReport from "src/shared/types/CommunitySentenceReport"
import fetchCommunitySentenceReport from "./fetchCommunitySentenceReport"
import type { CommunitySentenceReportConfig } from "./config"
import { createJwt } from "src/shared/createJwt"
import { communitySentenceReportRecords } from "./test/dummyMessages"

jest.mock("src/shared/createJwt")

const fetchMock = jest.fn()
const originalFetch = global.fetch

const pfaCode = "001122"
const period = {
  start: new Date("2026-09-30T23:00:00.000Z"),
  end: new Date("2026-11-01T00:00:00.000Z")
}
const config = {
  api: { apiUrl: "http://api.test" },
  reportsBucket: "bichard-7-testing-reporting-files",
  reportName: "reports/CommunitySentenceReport.xlsx"
} as CommunitySentenceReportConfig

const okResponse = (body: CommunitySentenceReport[]) =>
  ({ ok: true, status: 200, json: jest.fn().mockResolvedValue(body) }) as unknown as Response

const errorResponse = (status: number) => ({ ok: false, status, json: jest.fn() }) as unknown as Response

describe("fetchCommunitySentenceReport", () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.mocked(createJwt).mockReturnValue("test-jwt")
    global.fetch = fetchMock as unknown as typeof fetch
  })

  afterEach(() => {
    global.fetch = originalFetch
    jest.restoreAllMocks()
  })

  it("calls the api with expected url, query params, and auth header", async () => {
    fetchMock.mockResolvedValue(okResponse(communitySentenceReportRecords))

    await fetchCommunitySentenceReport(pfaCode, period, config.api)

    expect(fetchMock).toHaveBeenCalledTimes(1)

    const url = fetchMock.mock.calls[0][0]
    const options = fetchMock.mock.calls[0][1]
    const parsed = new URL(url)

    expect(parsed.origin).toBe("http://api.test")
    expect(Object.fromEntries(parsed.searchParams)).toEqual({
      fromDate: "2026-09-30",
      toDate: "2026-11-01",
      exceptions: "true",
      triggers: "true",
      pfaCode: "001122"
    })

    expect(options).toEqual({ headers: { Authorization: "test-jwt" } })
  })

  it("returns parsed record on a successful response", async () => {
    fetchMock.mockResolvedValue(okResponse(communitySentenceReportRecords))

    const result = await fetchCommunitySentenceReport(pfaCode, period, config.api)

    expect(result).toEqual(communitySentenceReportRecords)
  })

  it("returns an empty array when api returns no record", async () => {
    fetchMock.mockResolvedValue(okResponse([]))

    const result = await fetchCommunitySentenceReport(pfaCode, period, config.api)

    expect(result).toEqual([])
  })

  it("returns an error, rather than throwing, for a non-OK status", async () => {
    fetchMock.mockResolvedValue(errorResponse(500))

    const result = await fetchCommunitySentenceReport("PFA1", period, config.api)

    expect(result).toBeInstanceOf(Error)
    expect((result as Error).message).toBe("HTTP Error: 500")
  })

  it("returns the error when the response body is not valid JSON", async () => {
    const parseError = new SyntaxError("Invalid JSON")
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockRejectedValue(parseError)
    } as unknown as Response)

    const result = await fetchCommunitySentenceReport("PFA1", period, config.api)

    expect(result).toBe(parseError)
  })
})
