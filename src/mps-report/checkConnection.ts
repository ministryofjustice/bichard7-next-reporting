import type { PostgresGateway } from "src/shared/postgres-gateway"
import type { PromiseResult } from "src/shared/types"
import { isError } from "src/shared/types"

export default async (gateway: PostgresGateway): PromiseResult<boolean> => {
  const query = `
    SELECT count(*)
    FROM BR7OWN.ERROR_LIST 
  `

  const result = await gateway.execute(query)
  if (isError(result)) {
    return result
  }
  return true
}
