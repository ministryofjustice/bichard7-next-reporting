import type { PostgresGateway } from "src/shared/postgres-gateway"
import type { PromiseResult } from "src/shared/types"

export type CourtError = {
  court_date: Date
  asn: string
  annotated_msg: string
  defendant_name: string
  error_locked_by_id: string
  trigger_locked_by_id: string
  error_status: number
  trigger_status: number
  is_urgent: number
  error_id: number
  error_report: string
  phase: number
  triggers: string
  force_code: string
  court_code: string
}

export default (gateway: PostgresGateway): PromiseResult<CourtError[]> => {
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

  return gateway.getResult<CourtError>(query)
}
