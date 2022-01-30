/* eslint-disable no-console */
import { DynamoGateway } from "@bichard/dynamo-gateway"
import { isError } from "@bichard/types"
import config from "./config"
import getEmailer from "./getEmailer"
import SendReportUseCase from "./SendReportUseCase"

const emailer = getEmailer(config.smtp)
const gateway = new DynamoGateway(config.dynamo)
const sendReportUseCase = new SendReportUseCase(gateway, emailer)

interface MpsReportResult {
  report?: string
  error?: string
}

export default async (): Promise<MpsReportResult> => {
  console.log("Sending Common Platform error report")
  const result = await sendReportUseCase.execute()

  if (isError(result)) {
    console.error(result.message)
    throw result
  }
  console.log("Common Platform error report sent successfully")

  return Promise.resolve({
    report: "Report sent successfully"
  })
}
