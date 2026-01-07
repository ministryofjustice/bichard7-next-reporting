import { isError } from "src/shared/types"
import config from "./config"
import getEmailer from "./getEmailer"
import SendReportUseCase from "./SendReportUseCase"
import shouldSendReport from "./shouldSendReport"

const emailer = getEmailer(config.smtp)
const sendReportUseCase = new SendReportUseCase(emailer)

const hoursToSend = [5, 17]

interface MpsReportResult {
  report?: string
  error?: string
}

export default async (event: unknown): Promise<MpsReportResult> => {
  let now = new Date()
  if (event !== undefined && event instanceof Date) {
    // Enable us to override the date for end to end testing
    now = event
  }
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
