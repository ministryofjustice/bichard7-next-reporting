import getLastMonthDates from "src/shared/getLastMonthDates"
import fetchCommunitySentenceReport from "./fetchCommunitySentenceReport"
import getConfig from "./config"
import { isError } from "src/shared/types"
import { convertRecordsToXlsx } from "src/shared/csv-to-xlsx"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { toIsoDate } from "src/shared/toIsoDate"

interface SentencingActReportResult {
  report?: string
  error?: string
}

const XLSX_CONTENT_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

const getReferenceDate = (override = process.env.DATE): Date => {
  if (!override) {
    return new Date()
  }

  const requestedDate = new Date(override)

  return new Date(Date.UTC(requestedDate.getUTCFullYear(), requestedDate.getUTCMonth() + 1, 1))
}

export const handler = async (): Promise<SentencingActReportResult> => {
  const config = getConfig()
  const period = getLastMonthDates(getReferenceDate())
  const startDate = toIsoDate(period.start)
  const endDate = toIsoDate(period.end)

  console.log(`Generating report for the period ${startDate} to ${endDate}`)
  const sentences = await fetchCommunitySentenceReport(period, config.api)

  if (isError(sentences)) {
    throw sentences
  }

  console.log(`Fetched ${sentences.length} records`)

  const workbook = convertRecordsToXlsx(sentences, `Sentencing Act Report ${startDate} to ${endDate}`)

  console.log(`Uploading to s3://${config.reportsBucket}/${config.reportName}`)
  const s3 = new S3Client(config.s3)

  await s3.send(
    new PutObjectCommand({
      Bucket: config.reportsBucket,
      Key: config.reportName,
      Body: workbook,
      ContentType: XLSX_CONTENT_TYPE
    })
  )

  return { report: "Upload succeeded" }
}
