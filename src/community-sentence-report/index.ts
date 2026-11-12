import getLastMonthDates from "src/shared/getLastMonthDates"
import getConfig from "./config"
import { S3Client } from "@aws-sdk/client-s3"
import { toIsoDate } from "src/shared/toIsoDate"
import generateAndUploadReport from "./generateAndUploadReport"

interface SentencingActReportResult {
  report?: string
  error?: string
}

const getReferenceDate = (override = process.env.DATE): Date => {
  if (!override) {
    return new Date()
  }

  const requestedDate = new Date(override)

  return new Date(Date.UTC(requestedDate.getUTCFullYear(), requestedDate.getUTCMonth() + 1, 1))
}

// TO BE REMOVED
const pfaCodes = ["001122", "001133", "001144"]

export const handler = async (): Promise<SentencingActReportResult> => {
  const config = getConfig()
  const period = getLastMonthDates(getReferenceDate())
  const startDate = toIsoDate(period.start)
  const endDate = toIsoDate(period.end)
  const s3 = new S3Client(config.s3)

  console.log(`Generating report for the period ${startDate} to ${endDate}`)

  await Promise.all(pfaCodes.map((pfaCode) => generateAndUploadReport(pfaCode, period, config, s3)))

  return { report: "Upload succeeded" }
}
