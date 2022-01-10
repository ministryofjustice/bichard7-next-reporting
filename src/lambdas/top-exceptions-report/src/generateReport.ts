import { findForceName } from "@bichard/forces"
import type { AuditLog, KeyValuePair } from "@bichard/types"
import getErrorName from "./errorNames/getErrorName"
import { stringify } from "csv-stringify/sync"

type ForceExceptions = KeyValuePair<string, number>
type ForcesExceptions = KeyValuePair<string, ForceExceptions>

const getAttributesWithErrors = (messages: AuditLog[]): KeyValuePair<string, unknown>[] => {
  return messages
    .filter((x) => x.events && x.events.some((e) =>'Error 1 Details' in e.attributes))
    .map((x) => {
      const events = x.events
      for(let i=0; i< events.length; i+=1) {
        if(x.automationReport?.forceOwner) {
          events[i].attributes["Force Owner"] = x.automationReport.forceOwner
        }
      }
      return events
    })
    .reduce((allEvents, topExceptionsReportEvents) => allEvents.concat(topExceptionsReportEvents), [])
    .map((event) => event.attributes)
}

const calculateForcesExceptions = (allAttributes: KeyValuePair<string, unknown>[]): ForcesExceptions => {
  return allAttributes.reduce((forces, attributes) => {
    const forceOwner = attributes["Force Owner"] as string
    const forceName = findForceName(forceOwner) ?? "National"
    const forceExceptions = (forces[forceName] || {}) as ForceExceptions

    Object.keys(attributes)
      .filter((attributeName) => attributeName.match(/Error.*Details/))
      .forEach((key) => {
        const exceptionCode = (attributes[key] as string).split("||")[0]
        forceExceptions[exceptionCode] = (forceExceptions[exceptionCode] || 0) + 1
      })

    // eslint-disable-next-line no-param-reassign
    forces[forceName] = forceExceptions
    return forces
  }, {}) as ForcesExceptions
}

const generateCsv = (forcesExceptions: ForcesExceptions): string => {
  let rows = [["Force" ,"Exception" ,"Error Text" ,"Count"]]
  Object.keys(forcesExceptions).forEach((forceName) => {
    const forceExceptions = forcesExceptions[forceName]
    Object.keys(forceExceptions).forEach((exceptionCode) => {
      const errorText = getErrorName(exceptionCode)
      rows.push([`${forceName}`,`${exceptionCode}`,`${errorText}`,`${forceExceptions[exceptionCode]}`])
    })
  })
  return stringify(rows)
}

export default (messages: AuditLog[]): string => {
  const attributesWithErrors = getAttributesWithErrors(messages)

  const forcesExceptions = calculateForcesExceptions(attributesWithErrors)

  const csvResult = generateCsv(forcesExceptions)

  return csvResult
}
