import type { PostgresGateway } from "@bichard/postgres-gateway"
import { isError } from "@bichard/types"
import type { PromiseResult } from "@bichard/types"

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
