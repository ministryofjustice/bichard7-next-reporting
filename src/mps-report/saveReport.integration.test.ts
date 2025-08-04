import JSZip from "jszip"
import { PostgresGateway } from "src/shared/postgres-gateway"
import { isError } from "src/shared/types"
import config from "./lib/config"
import saveReport from "./saveReport"

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
    await gateway.execute("DELETE FROM br7own.work_allocation_report")
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
    const zipData = await JSZip.loadAsync(new Uint8Array(result[0].report))
    const zipFiles = zipData.file(/Area01\.\d{10}\.csv/)
    expect(zipFiles).toHaveLength(1)
    const content = await zipFiles[0].async("string")
    expect(content).toEqual(reportToSave)
  })
})
