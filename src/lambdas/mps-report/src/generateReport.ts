import getCourtErrors from "./getCourtErrors"
import { headers } from "../config/mpsHeadingKeys"
import getOffenceCode from "./getOffenceCode"
import AnnotatedHearingOutcome from "./types/AnnotatedHearingOutcome"
import { PostgresGateway } from "@bichard/postgres-gateway"
import { isError } from "@bichard/types"
import { xml2js } from "xml-js"
import { getText } from "./types/XmlStringCell"
import getResultQualifierCodes from "./getResultQualifierCodes"
import getDurationAndAmount from "./getDurationAndAmount"
import OffenceDetails, { isMultiple } from "./types/OffenceDetails"
import OffenceResult from "./types/OffenceResult"
import HearingOutcomeCase from "./types/HearingOutcomeCase"
import AnnotatedPNCUpdateDataset from "./types/AnnotatedPNCUpdateDataset"

interface ReportRowResultQuery {
    court_date: string
    court_code: string
    force_code: string
    is_urgent: string
    defendant_name: string
    triggers: string
    error_report: string
}

function updateCommonHeaders(row: ReportRowResultQuery, hearingOutcomeCase: HearingOutcomeCase, offence:OffenceDetails) {
  return [
    row.court_date, // Hearing Date
    row.court_code, // Court
    row.force_code, // Force
    row.is_urgent, // Urgent
    row.defendant_name, // Defendant
    getText(hearingOutcomeCase.HearingDefendant.DefendantDetail?.BirthDate), // DoB
    getText(hearingOutcomeCase.HearingDefendant.ArrestSummonsNumber), // ASN
    getText(hearingOutcomeCase.PTIURN), // URN
    row.triggers, // Triggers
    row.error_report, // Errors
    getOffenceCode(offence.CriminalProsecutionReference), // Offence Code
    getText(offence.ActualOffenceStartDate.StartDate), // Offence Start Date
    getText(offence.LocationOfOffence), // Offence Location
  ]
}

export default async (gateway: PostgresGateway) => {
  const rows = await getCourtErrors(gateway)
  if (isError(rows)) {
    return rows
  }
  
  let result = []
  result.push(headers.join(","))
  for (let i = 0; i < rows.length; i = i + 1) {
    const annotatedMsg: string = rows[i].annotated_msg.replace(/br7:/g, "").replace(/ds:/g, "")
    let annotatedMsgObject = (xml2js(annotatedMsg, { compact: true }) as AnnotatedPNCUpdateDataset)?.AnnotatedPNCUpdateDataset?.PNCUpdateDataset
    if(!annotatedMsgObject) {
      annotatedMsgObject = (xml2js(annotatedMsg, { compact: true }) as AnnotatedHearingOutcome)
    }
    const offences = annotatedMsgObject.AnnotatedHearingOutcome.HearingOutcome.Case.HearingDefendant.Offence
    const hearingOutcomeCase = annotatedMsgObject.AnnotatedHearingOutcome.HearingOutcome.Case

    if (isMultiple<OffenceDetails>(offences)) {
      for (let o = 0; o < offences.length; o = o + 1) {
        const newRow = updateCommonHeaders(rows[i], hearingOutcomeCase, offences[o])

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
      const newRow = updateCommonHeaders(rows[i], hearingOutcomeCase, offences)

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

  return result.join("\r\n")
}
