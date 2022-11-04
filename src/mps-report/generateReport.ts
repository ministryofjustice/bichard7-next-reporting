import { stringify } from "csv-stringify/sync"
import type { PostgresGateway } from "src/shared/postgres-gateway"
import type { PromiseResult } from "src/shared/types"
import { isError } from "src/shared/types"
import { xml2js } from "xml-js"
import headers from "./config/mpsHeadingKeys"
import type { CourtError } from "./getCourtErrors"
import getCourtErrors from "./getCourtErrors"
import getDurationAndAmount from "./getDurationAndAmount"
import getOffenceCode from "./getOffenceCode"
import getResultQualifierCodes from "./getResultQualifierCodes"
import type AnnotatedHearingOutcome from "./types/AnnotatedHearingOutcome"
import type AnnotatedPNCUpdateDataset from "./types/AnnotatedPNCUpdateDataset"
import type HearingOutcomeCase from "./types/HearingOutcomeCase"
import type OffenceDetails from "./types/OffenceDetails"
import { isMultiple } from "./types/OffenceDetails"
import type OffenceResult from "./types/OffenceResult"
import { getText } from "./types/XmlStringCell"

function updateCommonHeaders(row: CourtError, hearingOutcomeCase: HearingOutcomeCase, offence: OffenceDetails) {
  return [
    new Date(row.court_date).toISOString().split("T")[0], // Hearing Date
    row.court_code, // Court
    "1", // row.force_code, // Hard coded Force
    row.is_urgent === 1 ? "Y" : "N", // Urgent
    row.defendant_name, // Defendant
    getText(hearingOutcomeCase.HearingDefendant.DefendantDetail?.BirthDate), // DoB
    getText(hearingOutcomeCase.HearingDefendant.ArrestSummonsNumber), // ASN
    getText(hearingOutcomeCase.PTIURN), // URN
    row.triggers, // Triggers
    row.error_status === 1
      ? row.error_report
          .split(", ")
          .map((x) => x.split("|")[0])
          .join(" ")
      : "none", // Errors
    getOffenceCode(offence.CriminalProsecutionReference), // Offence Code
    getText(offence.ActualOffenceStartDate.StartDate), // Offence Start Date
    getText(offence.LocationOfOffence) // Offence Location
  ]
}

export default async (gateway: PostgresGateway): PromiseResult<string> => {
  const rows = await getCourtErrors(gateway)
  if (isError(rows)) {
    return rows
  }

  const result = []
  const now = new Date()
  result.push([
    "MPS Data Extract",
    `${now.getUTCDate().toString().padStart(2, "0")}/${(now.getUTCMonth() + 1)
      .toString()
      .padStart(2, "0")}/${now.getFullYear()} ${now.toISOString().split("T")[1].split(".")[0]}`,
    "",
    "NOT PROTECTIVELY MARKED"
  ])
  result.push([""])
  result.push(headers)
  for (let i = 0; i < rows.length; i += 1) {
    const annotatedMsg: string = rows[i].annotated_msg.replace(/br7:/g, "").replace(/ds:/g, "")
    let annotatedMsgObject = (xml2js(annotatedMsg, { compact: true }) as AnnotatedPNCUpdateDataset)
      ?.AnnotatedPNCUpdateDataset?.PNCUpdateDataset
    if (!annotatedMsgObject) {
      annotatedMsgObject = xml2js(annotatedMsg, { compact: true }) as AnnotatedHearingOutcome
    }
    const offences = annotatedMsgObject?.AnnotatedHearingOutcome?.HearingOutcome?.Case?.HearingDefendant?.Offence
    const hearingOutcomeCase = annotatedMsgObject?.AnnotatedHearingOutcome?.HearingOutcome?.Case

    if (!offences) {
      continue
    }
    if (isMultiple<OffenceDetails>(offences)) {
      for (let o = 0; o < offences.length; o += 1) {
        const newRow = updateCommonHeaders(rows[i], hearingOutcomeCase, offences[o])

        const results = offences[o].Result
        if (isMultiple<OffenceResult>(results)) {
          for (let j = 0; j < 10; j += 1) {
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
          for (let j = 0; j < 9; j += 1) {
            newRow.push("") // result code
            newRow.push("") // result duration/amount
            newRow.push("") // result text
            newRow.push("") // result qualifier
          }
        }
        newRow.push(rows[i].trigger_locked_by_id ? rows[i].trigger_locked_by_id : "") // Trigger Locked By
        newRow.push(rows[i].error_locked_by_id ? rows[i].error_locked_by_id : "") // Exception Locked By

        result.push(newRow)
      }
    } else {
      const newRow = updateCommonHeaders(rows[i], hearingOutcomeCase, offences)

      const results = offences.Result
      if (isMultiple<OffenceResult>(results)) {
        for (let j = 0; j < 10; j += 1) {
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
        for (let j = 0; j < 9; j += 1) {
          newRow.push("") // result code
          newRow.push("") // result duration/amount
          newRow.push("") // result text
          newRow.push("") // result qualifier
        }
      }
      newRow.push(rows[i].trigger_locked_by_id ? rows[i].trigger_locked_by_id : "") // Trigger Locked By
      newRow.push(rows[i].error_locked_by_id ? rows[i].error_locked_by_id : "") // Exception Locked By

      result.push(newRow)
    }
  }

  return stringify(result)
}
