import getCourtErrors from "./getCourtErrors"
import { headers } from "../config/mpsHeadingKeys"
import getOffenceCode from "./getOffenceCode"
import AnnotatedHearingOutcome from "./types/AnnotatedHearingOutcome"
import config from "./lib/config"
import { PostgresGateway } from "@bichard/postgres-gateway"
import { isError } from "@bichard/types"
import { xml2js } from "xml-js"
import { getText } from "./types/XmlStringCell"
import getResultQualifierCodes from "./getResultQualifierCodes"
import getDurationAndAmount from "./getDurationAndAmount"
import OffenceDetails, { isMultiple } from "./types/OffenceDetails"
import OffenceResult from "./types/OffenceResult"

export default async () => {
  const gateway = new PostgresGateway(config.database)

  const rows = await getCourtErrors(gateway)
  if (isError(rows)) {
    return rows
  }
  let result = []
  result.push(headers.join(","))
  for (let i = 0; i < rows.length; i = i + 1) {
    let annotatedMsg: string = rows[i].annotated_msg.replace(/br7:/g, "").replace(/ds:/g, "")
    let annotatedMsgObject = xml2js(annotatedMsg, { compact: true }) as AnnotatedHearingOutcome
    const offences = annotatedMsgObject.AnnotatedHearingOutcome.HearingOutcome.Case.HearingDefendant.Offence

    if (isMultiple<OffenceDetails>(offences)) {
      for (let o = 0; o < offences.length; o = o + 1) {
        let newRow = []
        newRow.push(rows[i].court_date) // Hearing Date
        newRow.push(rows[i].court_code) // Court
        newRow.push(rows[i].force_code) // Force
        newRow.push(rows[i].is_urgent) // Urgent
        newRow.push(rows[i].defendant_name) // Defendant
        newRow.push(
          getText(
            annotatedMsgObject.AnnotatedHearingOutcome.HearingOutcome.Case.HearingDefendant.DefendantDetail?.BirthDate
          )
        ) // DoB
        newRow.push(
          getText(annotatedMsgObject.AnnotatedHearingOutcome.HearingOutcome.Case.HearingDefendant.ArrestSummonsNumber)
        ) // ASN
        newRow.push(getText(annotatedMsgObject.AnnotatedHearingOutcome.HearingOutcome.Case.PTIURN)) // URN
        newRow.push(rows[i].triggers) // Triggers
        newRow.push(rows[i].error_report) // Errors

        newRow.push(getOffenceCode(offences[o].CriminalProsecutionReference)) // Offence Code
        newRow.push(getText(offences[o].ActualOffenceStartDate.StartDate)) // Offence Start Date
        newRow.push(getText(offences[o].LocationOfOffence)) // Offence Location

        const results = offences[o].Result
        if (isMultiple<OffenceResult>(results)) {
          for (let j = 0; j < 10; j = j + 1) {
            if (j >= results.length) {
              newRow.push("") // result code
              newRow.push("") // result duration/amount
              newRow.push("") // result text
              newRow.push("") // result qualifier
            } else {
              // j-th
              newRow.push(getText(results[j].CJSresultCode)) // result code
              newRow.push(getDurationAndAmount(results[j])) // result duration/amount
              newRow.push(getText(results[j].ResultVariableText)) // result text
              newRow.push(getResultQualifierCodes(results[j].ResultQualifierVariable)) // result qualifier
            }
          }
        } else {
          newRow.push(getText(results.CJSresultCode)) // result code
          newRow.push(getDurationAndAmount(results)) // result duration/amount
          newRow.push(getText(results.ResultVariableText)) // result text
          newRow.push(getResultQualifierCodes(results.ResultQualifierVariable)) // result qualifier

          // fill in the remaining 9 groups of cells
          for (let j = 0; j < 9; j = j + 1) {
            newRow.push("") // result code
            newRow.push("") // result duration/amount
            newRow.push("") // result text
            newRow.push("") // result qualifier
          }
        }
        newRow.push(rows[i].trigger_locked_by_id) // Trigger Locked By
        newRow.push(rows[i].error_locked_by_id) // Exception Locked By

        result.push(newRow.join(","))
      }
    } else {
      let newRow = []
      newRow.push(rows[i].court_date) // Hearing Date
      newRow.push(rows[i].court_code) // Court
      newRow.push(rows[i].force_code) // Force
      newRow.push(rows[i].is_urgent) // Urgent
      newRow.push(rows[i].defendant_name) // Defendant
      newRow.push(
        getText(
          annotatedMsgObject.AnnotatedHearingOutcome.HearingOutcome.Case.HearingDefendant.DefendantDetail?.BirthDate
        )
      ) // DoB
      newRow.push(
        getText(annotatedMsgObject.AnnotatedHearingOutcome.HearingOutcome.Case.HearingDefendant.ArrestSummonsNumber)
      ) // ASN
      newRow.push(getText(annotatedMsgObject.AnnotatedHearingOutcome.HearingOutcome.Case.PTIURN)) // URN
      newRow.push(rows[i].triggers) // Triggers
      newRow.push(rows[i].error_report) // Errors

      newRow.push(getOffenceCode(offences.CriminalProsecutionReference)) // Offence Code
      newRow.push(getText(offences.ActualOffenceStartDate.StartDate)) // Offence Start Date
      newRow.push(getText(offences.LocationOfOffence)) // Offence Location

      const results = offences.Result
      if (isMultiple<OffenceResult>(results)) {
        for (let j = 0; j < 10; j = j + 1) {
          if (j >= results.length) {
            newRow.push("") // result code
            newRow.push("") // result duration/amount
            newRow.push("") // result text
            newRow.push("") // result qualifier
          } else {
            // j-th
            newRow.push(getText(results[j].CJSresultCode)) // result code
            newRow.push(getDurationAndAmount(results[j])) // result duration/amount
            newRow.push(getText(results[j].ResultVariableText)) // result text
            newRow.push(getResultQualifierCodes(results[j].ResultQualifierVariable)) // result qualifier
          }
        }
      } else {
        newRow.push(getText(results.CJSresultCode)) // result code
        newRow.push(getDurationAndAmount(results)) // result duration/amount
        newRow.push(getText(results.ResultVariableText)) // result text
        newRow.push(getResultQualifierCodes(results.ResultQualifierVariable)) // result qualifier

        // fill in the remaining 9 groups of cells
        for (let j = 0; j < 9; j = j + 1) {
          newRow.push("") // result code
          newRow.push("") // result duration/amount
          newRow.push("") // result text
          newRow.push("") // result qualifier
        }
      }
      newRow.push(rows[i].trigger_locked_by_id) // Trigger Locked By
      newRow.push(rows[i].error_locked_by_id) // Exception Locked By

      result.push(newRow.join(","))
    }
  }

  return result.join("\n")
}
