import { DynamoGateway } from "@bichard/dynamo-gateway"
import { isError, PromiseResult } from "@bichard/types"
import Emailer from "./types/Emailer"
import generateDates from "./generateDates"
import getReportData from "./getReportData"
import sendEmail from "./sendEmail"
import config from "./config"

export default class SendReportUseCase {
  protected readonly dynamo: DynamoGateway

  protected readonly emailer: Emailer

  constructor(dynamo: DynamoGateway, emailer: Emailer) {
    this.dynamo = dynamo
    this.emailer = emailer
  }

  async execute(): PromiseResult<boolean> {
    const timeRange = generateDates(new Date(), config.timePeriodHours)

    const records = await getReportData(this.dynamo, timeRange)
    if (isError(records)) {
      return records
    }

    const emailResult = sendEmail(this.emailer, timeRange, records)

    if (isError(emailResult)) {
      return emailResult
    }
    return true
  }
}