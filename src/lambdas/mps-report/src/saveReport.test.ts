import { PostgresGateway } from "@bichard/postgres-gateway"
import config from "./lib/config"
import saveReport from "./saveReport"
import { isError } from "@bichard/types"


describe("GenerateReport", () => {
    let gateway: PostgresGateway

    beforeAll(async () => {
        gateway = new PostgresGateway(config.database)
    })

    beforeEach(async ()=> {
        await gateway.getResult(`DELETE FROM br7own.work_allocation_report`)
    })

    it("should save a report to the DB", async () => {
        const reportToSave = "Best,Report,In,The,World"
        const saveResult = await saveReport(gateway, '01', reportToSave)
        if(isError(saveResult)) {
            expect(isError(saveResult)).toBeFalsy
            return;
        }

        const query = 'SELECT * FROM br7own.work_allocation_report'
        const result = await gateway.getResult(query)
        if(isError(result)) {
            expect(isError(result)).toBeFalsy
            return;
        }
        expect(result.length).toBe(1)
        expect(new TextDecoder().decode(result[0].report)).toBe(reportToSave)
    })
})