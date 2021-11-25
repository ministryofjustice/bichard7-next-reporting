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
            expect(reportResult).toBe(`Hearing Date,Court,Force,Urgent,Defendant,DoB,ASN,URN,Triggers,Errors,Offence Code,Offence Start Date (Incident date),Offence Location,1st Result Code,1st Result Duration / Amount,1st Result Text,1st Result Qualifiers,2nd Result Code,2nd Result Duration / Amount,2nd Result Text,2nd Result Qualifiers,3rd Result Code,3rd Result Duration / Amount,3rd Result Text,3rd Result Qualifiers,4th Result Code,4th Result Duration / Amount,4th Result Text,4th Result Qualifiers,5th Result Code,5th Result Duration / Amount,5th Result Text,5th Result Qualifiers,6th Result Code,6th Result Duration / Amount,6th Result Text,6th Result Qualifiers,7th Result Code,7th Result Duration / Amount,7th Result Text,7th Result Qualifiers,8th Result Code,8th Result Duration / Amount,8th Result Text,8th Result Qualifiers,9th Result Code,9th Result Duration / Amount,9th Result Text,9th Result Qualifiers,10th Result Code,10th Result Duration / Amount,10th Result Text,10th Result Qualifiers,Trigger Locked By,Exception Locked By
Sun Sep 01 2019 00:00:00 GMT+0100 (British Summer Time),FFUUSS,FFUUSS,42,defendant,1948-11-11,1101ZD0100000448754K,01ZD0303208,,,SX03001A,2010-11-28,Kingston High Street,3078,,Travel Restriction Order,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,System
Sun Sep 01 2019 00:00:00 GMT+0100 (British Summer Time),FFUUSS,FFUUSS,42,defendant,1948-11-11,1101ZD0100000448754K,01ZD0303208,,,SX03001,2010-11-28,Kingston High Street,3052,,defendant must never be allowed out,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,System
Sun Sep 01 2019 00:00:00 GMT+0100 (British Summer Time),FFUUSS,FFUUSS,42,defendant,1948-11-11,1101ZD0100000448754K,01ZD0303208,,,RT88191,2010-11-28,Kingston High Street,1015,100.00,Fined 100.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,System`)
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
            expect(reportResult).toBe(`Hearing Date,Court,Force,Urgent,Defendant,DoB,ASN,URN,Triggers,Errors,Offence Code,Offence Start Date (Incident date),Offence Location,1st Result Code,1st Result Duration / Amount,1st Result Text,1st Result Qualifiers,2nd Result Code,2nd Result Duration / Amount,2nd Result Text,2nd Result Qualifiers,3rd Result Code,3rd Result Duration / Amount,3rd Result Text,3rd Result Qualifiers,4th Result Code,4th Result Duration / Amount,4th Result Text,4th Result Qualifiers,5th Result Code,5th Result Duration / Amount,5th Result Text,5th Result Qualifiers,6th Result Code,6th Result Duration / Amount,6th Result Text,6th Result Qualifiers,7th Result Code,7th Result Duration / Amount,7th Result Text,7th Result Qualifiers,8th Result Code,8th Result Duration / Amount,8th Result Text,8th Result Qualifiers,9th Result Code,9th Result Duration / Amount,9th Result Text,9th Result Qualifiers,10th Result Code,10th Result Duration / Amount,10th Result Text,10th Result Qualifiers,Trigger Locked By,Exception Locked By
Sun Sep 01 2019 00:00:00 GMT+0100 (British Summer Time),FFUUSS,FFUUSS,42,defendant,,0000000000000000000A,00000000000,,,AA00000A,1967-08-13,a,1001,1H 1H 1H 0.01 0.01 0.01,a,  ,1001,1H 1H 1H 0.01 0.01 0.01,a,  ,1001,1H 1H 1H 0.01 0.01 0.01,a,  ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,System
Sun Sep 01 2019 00:00:00 GMT+0100 (British Summer Time),FFUUSS,FFUUSS,42,defendant,,0000000000000000000A,00000000000,,,AA00000A,1967-08-13,a,1001,1H 1H 1H 0.01 0.01 0.01,a,  ,1001,1H 1H 1H 0.01 0.01 0.01,a,  ,1001,1H 1H 1H 0.01 0.01 0.01,a,  ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,System
Sun Sep 01 2019 00:00:00 GMT+0100 (British Summer Time),FFUUSS,FFUUSS,42,defendant,,0000000000000000000A,00000000000,,,AA00000A,1967-08-13,a,1001,1H 1H 1H 0.01 0.01 0.01,a,  ,1001,1H 1H 1H 0.01 0.01 0.01,a,  ,1001,1H 1H 1H 0.01 0.01 0.01,a,  ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,System`)
    })
})
