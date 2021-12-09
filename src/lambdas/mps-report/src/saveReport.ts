import { PostgresGateway } from "@bichard/postgres-gateway"

export default async (gateway: PostgresGateway, areaCode: string, report: string) => {
    const updateQuery = `
DO $$
    BEGIN
        IF EXISTS (SELECT 1 FROM br7own.work_allocation_report WHERE area_code = $1) THEN
            BEGIN
                UPDATE br7own.work_allocation_report
                SET
                    report=cast($2 as bytea),
                    report_timestamp=NOW()
                WHERE
                    area_code = $1;
            END;
        ELSE
            BEGIN
                INSERT INTO br7own.work_allocation_report
                VALUES($1, cast($2 as bytea), NOW());
            END;
        end if;
    END
$$
    `
    const result = await gateway.getResult(updateQuery, [areaCode, report])

    return result
}
