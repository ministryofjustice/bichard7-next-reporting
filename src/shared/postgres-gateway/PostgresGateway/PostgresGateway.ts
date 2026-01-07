import pgPromise from "pg-promise"
import type { ITypeOverrides } from "pg-promise/typescript/pg-subset"
import type { PromiseResult } from "src/shared/types"
import { isError } from "src/shared/types"
import type Database from "./Database"
import type DatabaseConfig from "./DatabaseConfig"

const TypeOverrides = require("pg/lib/type-overrides.js")

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

  getResult<T = null>(query: string, parameters?: any[]): PromiseResult<T[]> {
    return this.connection.any<T>(query, parameters)
  }

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
