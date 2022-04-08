/* eslint-disable no-console */
import type { PromiseResult } from "@bichard/types"
import { isError } from "@bichard/types"
import config from "./config"
import generateDates from "./generateDates"
import getReportDataApi from "./getReportDataApi"
import sendEmail from "./sendEmail"
import type Emailer from "./types/Emailer"

export default class SendReportUseCase {
  protected readonly emailer: Emailer

  constructor(emailer: Emailer) {
    this.emailer = emailer
  }

  async execute(now: Date): PromiseResult<boolean> {
    const timeRange = generateDates(now, config.timePeriodHours)

    const records = await getReportDataApi(timeRange)
    if (isError(records)) {
      return records
    }
    const apiRecords = await getReportDataApi(timeRange)
    console.log(apiRecords)

    const emailResult = await sendEmail(this.emailer, timeRange, records)

    if (isError(emailResult)) {
      console.error("Error sending mail", emailResult)
      return emailResult
    }
    return true
  }
}
