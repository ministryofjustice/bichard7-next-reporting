import pgPromise from "pg-promise"
import { ITypeOverrides } from 'pg-promise/typescript/pg-subset';
const TypeOverrides = require('pg/lib/type-overrides');
import Database from "./Database"
import type { PromiseResult } from "@bichard/types"
import DatabaseConfig from "./DatabaseConfig"

const types: ITypeOverrides = new TypeOverrides(); // creating type overrides
types.setTypeParser(1082, (str: string) => new Date(str)); // setting new parser for Date using UTC

export default class PostgresGateway {
  protected readonly connection: Database

  constructor(config: DatabaseConfig) {
    this.connection = pgPromise({}
    )({
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: config.ssl ? { rejectUnauthorized: false } : false,
      types
    })
  }

  getResult(query: string, parameters?: string[]): PromiseResult<any[]> {
    return this.connection.any(query, parameters)
  }

  async close() {
    await this.connection.$pool.end()
  }
}
