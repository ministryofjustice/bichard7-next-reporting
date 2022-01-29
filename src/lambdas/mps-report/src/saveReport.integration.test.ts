import { PostgresGateway } from "@bichard/postgres-gateway"
import config from "./lib/config"
import saveReport from "./saveReport"
import { isError } from "@bichard/types"
var JSZip = require("jszip")

describe("GenerateReport", () => {
  let gateway: PostgresGateway

  beforeAll(async () => {
    gateway = new PostgresGateway(config.database)
  })

  beforeEach(async () => {
    await gateway.getResult(`DELETE FROM br7own.work_allocation_report`)
  })

  afterAll(async () => {
    await gateway.close()
  })

  it("should save a zipped report to the DB", async () => {
    const reportToSave = "Best,Report,In,The,World"
    const saveResult = await saveReport(gateway, "01", reportToSave)
    if (isError(saveResult)) {
      expect(isError(saveResult)).toBeFalsy
      return
    }

    const query = "SELECT * FROM br7own.work_allocation_report"
    const result = await gateway.getResult(query)
    if (isError(result)) {
      expect(isError(result)).toBeFalsy
      return
    }
    expect(result).toHaveLength(1)
    const zipData = await JSZip.loadAsync(result[0].report)
    const zipFiles = zipData.file(/Area01\.\d{10}\.csv/)
    expect(zipFiles).toHaveLength(1)
    const content = await zipFiles[0].async("string")
    expect(content).toEqual(reportToSave)
  })
})
