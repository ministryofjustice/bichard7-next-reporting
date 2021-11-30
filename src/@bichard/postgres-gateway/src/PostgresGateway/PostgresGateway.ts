import pgPromise from "pg-promise"
import Database from "./Database"
import type { PromiseResult } from "@bichard/types"
import DatabaseConfig from "./DatabaseConfig"

export default class PostgresGateway {
    protected readonly connection: Database

    constructor(config: DatabaseConfig) {
      this.connection = pgPromise( {}
      )({
        host: config.host,
        port: config.port,
        database: config.database,
        user: config.user,
        password: config.password,
        ssl: config.ssl ? { rejectUnauthorized: false } : false
      })
    }

    getResult(query: string, parameters?: string[]) : PromiseResult<any[]> {
        return this.connection.any(query, parameters)
    }
}
