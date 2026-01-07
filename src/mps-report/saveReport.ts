import JSZip from "jszip"
import type { PostgresGateway } from "src/shared/postgres-gateway"
import type { PromiseResult } from "src/shared/types"
import { isError } from "src/shared/types"

export default async (gateway: PostgresGateway, areaCode: string, report: string): PromiseResult<boolean> => {
  const zip = new JSZip()

  console.log(" -- Creating CSV file")
  const todaysDate = new Date().toISOString().split(":")[0].replace("T", "").replace(/-/g, "")
  zip.file(`Area${areaCode}.${todaysDate}.csv`, report)

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
  console.log(" -- Zipping file")
  const zippedReport = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: {
      level: 5
    }
  })

  console.log(" -- Running query")
  const result = await gateway.execute(updateQuery, [areaCode, zippedReport])

  if (isError(result)) {
    return result
  }
  return true
}
