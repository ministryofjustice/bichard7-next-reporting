import type { IDatabase } from "pg-promise"
import type pg from "pg-promise/typescript/pg-subset"

// eslint-disable-next-line @typescript-eslint/ban-types
type Database = IDatabase<{}, pg.IClient>

export default Database
