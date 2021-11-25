import { PostgresGateway } from "@bichard/postgres-gateway"
import generateReport from "./generateReport"
import config from "./lib/config"
import {readFileSync} from 'fs'

describe("GenerateReport", () => {
    let gateway: PostgresGateway

    beforeAll(async () => {
        gateway = new PostgresGateway(config.database)
    })

    beforeEach(async ()=> {
        await gateway.getResult(`DELETE FROM br7own.error_list`)
    })

    it("should generate report when errors are present in the table 1", async () => {
        let errorReport = readFileSync("src/exampleFiles/exampleAnnotatedMsg.xml", 'utf8')

        errorReport = errorReport.replace(/'/g,"")
        await gateway.getResult(`INSERT INTO br7own.error_list 
        VALUES(default, 'msgid1', 0, 1, 1, 0, 0, 0, 'System', null, 42, 'ASN', 'FFUUSS', '${errorReport}', 'UPD-MSG', '', current_timestamp, 'error-reason', 'trg-reason', 0, 0, current_date, 'ptiurn', 'court-name', null, current_timestamp, 'err-resolved-by', 'trg-resolved-by', null, null, 'defendant', 'FFUUSS', null, 'court-ref', null, null, null, default, default)`)
        await gateway.getResult(`
            UPDATE br7own.error_list
            SET court_date = '9/1/2019'
            WHERE message_id = 'msgid1'
       `)
        const reportResult = await generateReport(gateway)
        expect(reportResult).not.toBe(undefined)
        expect(reportResult).toMatchSnapshot()
    })

    it("should generate report when using record with multiple durations", async () => {
        let errorReport = readFileSync("src/exampleFiles/exampleMultipleDurationMsg.xml", 'utf8')

        errorReport = errorReport.replace(/'/g,"")
        await gateway.getResult(`INSERT INTO br7own.error_list 
        VALUES(default, 'msgid1', 0, 1, 1, 0, 0, 0, 'System', null, 42, 'ASN', 'FFUUSS', '${errorReport}', 'UPD-MSG', '', current_timestamp, 'error-reason', 'trg-reason', 0, 0, current_date, 'ptiurn', 'court-name', null, current_timestamp, 'err-resolved-by', 'trg-resolved-by', null, null, 'defendant', 'FFUUSS', null, 'court-ref', null, null, null, default, default)`)
        await gateway.getResult(`
            UPDATE br7own.error_list
            SET court_date = '9/1/2019'
            WHERE message_id = 'msgid1'
       `)
        const reportResult = await generateReport(gateway)
        expect(reportResult).not.toBe(undefined)
        expect(reportResult).toMatchSnapshot()
    })
})
