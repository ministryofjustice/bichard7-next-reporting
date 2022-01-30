import { PostgresGateway } from "@bichard/postgres-gateway"
import { isError } from "@bichard/types"
import config from "./lib/config"
import saveReport from "./saveReport"

const JSZip = require("jszip")

type ReportRecord = {
  area_code: string
  report: Buffer
  report_timestamp: Date
}

describe("GenerateReport", () => {
  let gateway: PostgresGateway

  beforeAll(() => {
    gateway = new PostgresGateway(config.database)
  })

  beforeEach(async () => {
    await gateway.execute(`DELETE FROM br7own.work_allocation_report`)
  })

  afterAll(async () => {
    await gateway.close()
  })

  it("should save a zipped report to the DB", async () => {
    const reportToSave = "Best,Report,In,The,World"
    const saveResult = await saveReport(gateway, "01", reportToSave)
    if (isError(saveResult)) {
      throw saveResult
    }

    const query = "SELECT * FROM br7own.work_allocation_report"
    const result = await gateway.getResult<ReportRecord>(query)
    if (isError(result)) {
      throw result
    }
    expect(result).toHaveLength(1)
    const zipData = await JSZip.loadAsync(result[0].report)
    const zipFiles = zipData.file(/Area01\.\d{10}\.csv/)
    expect(zipFiles).toHaveLength(1)
    const content = await zipFiles[0].async("string")
    expect(content).toEqual(reportToSave)
  })
})
