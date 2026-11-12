import { isError, type Interval } from "src/shared/types"
import type { CommunitySentenceReportConfig } from "./config"
import { PutObjectCommand, type S3Client } from "@aws-sdk/client-s3"
import fetchCommunitySentenceReport from "./fetchCommunitySentenceReport"
import { generateReport } from "./generateReport"

const XLSX_CONTENT_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

const generateAndUploadReport = async (
  pfaCode: string,
  period: Interval,
  config: CommunitySentenceReportConfig,
  s3: S3Client
) => {
  const sentences = await fetchCommunitySentenceReport(pfaCode, period, config.api)

  if (isError(sentences)) {
    throw sentences
  }

  console.log(`Fetched ${sentences.length} records for pfa code: ${pfaCode}`)
  console.log(`Generating report for pfa code: ${pfaCode}...`)
  const report = generateReport(sentences, period)

  const key = `${pfaCode}/${config.reportName}`
  console.log(`[${pfaCode}] Uploading to s3://${config.reportsBucket}/${key}`)

  await s3.send(
    new PutObjectCommand({
      Bucket: config.reportsBucket,
      Key: key,
      Body: report,
      ContentType: XLSX_CONTENT_TYPE
    })
  )
}

export default generateAndUploadReport
