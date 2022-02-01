import pgPromise from "pg-promise"
import type { ITypeOverrides } from "pg-promise/typescript/pg-subset"
import type { PromiseResult } from "@bichard/types"
import { isError } from "@bichard/types"
import type Database from "./Database"
import type DatabaseConfig from "./DatabaseConfig"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const TypeOverrides = require("pg/lib/type-overrides")

const types: ITypeOverrides = new TypeOverrides() // creating type overrides
types.setTypeParser(1082, (str: string) => new Date(str)) // setting new parser for Date using UTC

export default class PostgresGateway {
  protected readonly connection: Database

  constructor(config: DatabaseConfig) {
    this.connection = pgPromise({})({
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: config.ssl ? { rejectUnauthorized: false } : false,
      types
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getResult<T = null>(query: string, parameters?: any[]): PromiseResult<T[]> {
    return this.connection.any<T>(query, parameters)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(query: string, parameters?: any[]): PromiseResult<boolean> {
    const result = await this.connection.manyOrNone(query, parameters)
    if (isError(result)) {
      return result
    }
    return true
  }

  async close(): Promise<void> {
    await this.connection.$pool.end()
  }
}
