import { PostgresGateway } from "@bichard/postgres-gateway"

export default async (gateway: PostgresGateway, areaCode: string, report: string) => {
    const updateQuery = `
DO $$
    BEGIN
        IF EXISTS (SELECT 1 FROM br7own.work_allocation_report WHERE area_code = $1) THEN
            BEGIN
                UPDATE br7own.work_allocation_report
                SET
                    report=$2,
                    report_timestamp=NOW();
            END;
        ELSE
            BEGIN
                INSERT INTO br7own.work_allocation_report
                VALUES($1, $2, NOW());
            END;
        end if;
    END
$$
    `
    const result = await gateway.getResult(updateQuery, [areaCode, report])

    return result
}
