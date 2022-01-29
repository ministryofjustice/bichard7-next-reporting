import { PostgresGateway } from "@bichard/postgres-gateway"

export default async (gateway: PostgresGateway) => {
  const query = `
    SELECT error.court_date, 
      error.asn, 
      error.annotated_msg, 
      error.defendant_name, 
      error.error_locked_by_id, 
      error.trigger_locked_by_id, 
      error.error_status, 
      error.trigger_status, 
      error.is_urgent, 
      error.error_id, 
      error.error_report, 
      error.phase, 
      BR7OWN.unres_triggers(error_id) as triggers,
      CAST(error.ORG_FOR_POLICE_FILTER as varchar(6)) as force_code, 
      error.court_code 
    FROM BR7OWN.ERROR_LIST error
    WHERE (error.error_status = 1 or error.trigger_status = 1) 
    AND (error.org_for_police_filter like '01%' OR (error.error_locked_by_id = 'System' or error.trigger_locked_by_id = 'System')) 
    AND court_date <= DATE(NOW())
    ORDER BY court_date, asn DESC 
    FOR READ ONLY
  `

  const result = await gateway.getResult(query)
  return result
}
