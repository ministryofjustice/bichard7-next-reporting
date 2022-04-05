/* eslint-disable no-console */
import type { DynamoGateway } from "@bichard/dynamo-gateway"
import type { PromiseResult } from "@bichard/types"
import { isError } from "@bichard/types"
import config from "./config"
import generateDates from "./generateDates"
import getReportData from "./getReportData"
import sendEmail from "./sendEmail"
import type Emailer from "./types/Emailer"

export default class SendReportUseCase {
  protected readonly dynamo: DynamoGateway

  protected readonly emailer: Emailer

  constructor(dynamo: DynamoGateway, emailer: Emailer) {
    this.dynamo = dynamo
    this.emailer = emailer
  }

  async execute(now: Date): PromiseResult<boolean> {
    const timeRange = generateDates(now, config.timePeriodHours)

    const records = await getReportData(this.dynamo, timeRange)
    if (isError(records)) {
      return records
    }

    const emailResult = await sendEmail(this.emailer, timeRange, records)

    if (isError(emailResult)) {
      console.error("Error sending mail", emailResult)
      return emailResult
    }
    return true
  }
}
