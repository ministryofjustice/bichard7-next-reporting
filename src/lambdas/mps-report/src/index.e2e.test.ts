import pgPromise from "pg-promise"
import type { IDatabase } from "pg-promise"
import type pg from "pg-promise/typescript/pg-subset"
import { isError } from "../../../@bichard/types/build"

import handler from "./index"
import config from "./lib/config"

describe("End to end testing the mps report", () => {
  let connection: IDatabase<unknown, pg.IClient>

  beforeAll(async () => {
    connection = pgPromise({})({
      host: config.database.host,
      port: config.database.port,
      database: config.database.database,
      user: config.database.user,
      password: config.database.password,
      ssl: config.database.ssl ? { rejectUnauthorized: false } : false
    })
    await connection.none("DELETE FROM br7own.work_allocation_report;")
  })

  afterAll(() => {
    connection.$pool.end()
  })

  it("should put the correct report in Postgres", async () => {
    const result = await handler()
    expect(result).toEqual({
      report: "Saved successfuly"
    })

    const sqlQuery = `
      SELECT report_timestamp
      FROM br7own.work_allocation_report
      WHERE area_code='01'
    `

    const queryResult = await connection.one(sqlQuery).catch((error) => error as Error)
    expect(isError(queryResult)).toBeFalsy()
  })
})
