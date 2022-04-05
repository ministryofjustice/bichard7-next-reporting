/* eslint-disable no-console */
import { DynamoGateway } from "@bichard/dynamo-gateway"
import { isError } from "@bichard/types"
import config from "./config"
import getEmailer from "./getEmailer"
import SendReportUseCase from "./SendReportUseCase"
import shouldSendReport from "./shouldSendReport"

const emailer = getEmailer(config.smtp)
const gateway = new DynamoGateway(config.dynamo)
const sendReportUseCase = new SendReportUseCase(gateway, emailer)

const hoursToSend = [5, 17]

interface MpsReportResult {
  report?: string
  error?: string
}

export default async (now: Date = new Date()): Promise<MpsReportResult> => {
  if (shouldSendReport(now, hoursToSend)) {
    console.log("Sending Common Platform error report")
    const result = await sendReportUseCase.execute(now)

    if (isError(result)) {
      console.error(result.message)
      throw result
    }
    console.log("Common Platform error report sent successfully")

    return Promise.resolve({
      report: "Report sent successfully"
    })
  } else {
    return Promise.resolve({
      report: "Skipping sending report"
    })
  }
}
