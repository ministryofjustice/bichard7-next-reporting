import { PostgresGateway } from "@bichard/postgres-gateway"
import { isError } from "@bichard/types"
import getCourtErrors from "./getCourtErrors"
import config from "./lib/config"

describe("GenerateReport", () => {
  let gateway: PostgresGateway

  beforeAll(() => {
    gateway = new PostgresGateway(config.database)
  })

  beforeEach(async () => {
    await gateway.execute("TRUNCATE TABLE br7own.error_list CASCADE")
    await gateway.execute(`INSERT INTO br7own.error_list 
        VALUES(default, 'msgid1', 0, 1, 1, 0, 0, 0, 'System', null, 42, '1101ZD0100000448754K', 'B01EF01', '', 'UPD-MSG', '', current_timestamp, 'error-reason', 'trg-reason', 0, 0, current_date, 'ptiurn', 'court-name', null, current_timestamp, 'err-resolved-by', 'trg-resolved-by', null, null, 'defendant', '01ZD', null, 'court-ref', null, null, null, default, default)`)
  })

  afterAll(async () => {
    await gateway.close()
  })

  it("should be able to retrieve an error from the DB", async () => {
    const result = await getCourtErrors(gateway)
    expect(result).toBeDefined()
    if (isError(result)) {
      throw result
    }

    expect(result).toHaveLength(1)
    expect(result[0].asn).toBe("1101ZD0100000448754K")
    expect(result[0].triggers).toBe("")
    expect(result[0].force_code).toBe("01ZD")
    expect(result[0].court_code).toBe("B01EF01")
  })
})
