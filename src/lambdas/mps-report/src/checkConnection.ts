import { PostgresGateway } from "@bichard/postgres-gateway"

export default async (gateway: PostgresGateway) => {
  const query = `
    SELECT count(*)
    FROM BR7OWN.ERROR_LIST 
  `

  const result = await gateway.getResult(query)
  return result
}
