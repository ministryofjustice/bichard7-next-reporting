import type { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import type { CommunitySentenceReportConfig } from "./config"
import generateAndUploadReport from "./generateAndUploadReport"
import fetchCommunitySentenceReport from "./fetchCommunitySentenceReport"
import { communitySentenceReportRecords } from "./test/dummyMessages"
import { generateReport } from "./generateReport"

jest.mock("./fetchCommunitySentenceReport")
jest.mock("./generateReport")

const send = jest.fn()
const s3 = { send } as unknown as S3Client

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
const report = Buffer.from("xlsx-bytes")

describe("generateAndUploadReport", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("fetches records using the pfa code, period and api config", async () => {
    jest.mocked(fetchCommunitySentenceReport).mockResolvedValue(communitySentenceReportRecords)

    await generateAndUploadReport(pfaCode, period, config, s3)

    expect(fetchCommunitySentenceReport).toHaveBeenCalledWith(pfaCode, period, config.api)
  })

  it("generates the report from the fetched records and period", async () => {
    jest.mocked(fetchCommunitySentenceReport).mockResolvedValue(communitySentenceReportRecords)

    await generateAndUploadReport(pfaCode, period, config, s3)

    expect(generateReport).toHaveBeenCalledWith(communitySentenceReportRecords, period)
  })

  it("uploads the report to the expected bucket and key", async () => {
    jest.mocked(fetchCommunitySentenceReport).mockResolvedValue(communitySentenceReportRecords)
    jest.mocked(generateReport).mockReturnValue(report)

    await generateAndUploadReport(pfaCode, period, config, s3)

    expect(send).toHaveBeenCalledTimes(1)
    const command = send.mock.calls[0][0] as PutObjectCommand

    expect(command.input).toEqual({
      Bucket: "bichard-7-testing-reporting-files",
      Key: "001122/reports/CommunitySentenceReport.xlsx",
      Body: report,
      ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    })
  })

  it("throws and does not generate or upload when fetchCommunitySentenceReport returns an error", async () => {
    const error = new Error("API error")
    jest.mocked(fetchCommunitySentenceReport).mockResolvedValue(error)

    await expect(generateAndUploadReport(pfaCode, period, config, s3)).rejects.toThrow(error)

    expect(generateReport).not.toHaveBeenCalled()
    expect(send).not.toHaveBeenCalled()
  })

  it("throws and does not upload when report generation fails", async () => {
    jest.mocked(fetchCommunitySentenceReport).mockResolvedValue(communitySentenceReportRecords)
    jest.mocked(generateReport).mockImplementation(() => {
      throw new Error("bad data")
    })

    await expect(generateAndUploadReport(pfaCode, period, config, s3)).rejects.toThrow("bad data")

    expect(send).not.toHaveBeenCalled()
  })

  it("rejects when the s3 upload fails", async () => {
    jest.mocked(fetchCommunitySentenceReport).mockResolvedValue(communitySentenceReportRecords)
    send.mockRejectedValue(new Error("AccessDenied"))

    await expect(generateAndUploadReport(pfaCode, period, config, s3)).rejects.toThrow("AccessDenied")
  })
})
