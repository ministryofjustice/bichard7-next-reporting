import type { AuditLog, KeyValuePair } from "@bichard/types"
import getErrorName from "./errorNames/getErrorName"
import getOrganisationUnitName from "./organisationUnits/getOrganisationUnitName"

type ForceExceptions = KeyValuePair<string, number>
type ForcesExceptions = KeyValuePair<string, ForceExceptions>

const getAttributesWithErrors = (messages: AuditLog[]): KeyValuePair<string, unknown>[] => {
  return messages
    .map((x) => x.events)
    .reduce((allEvents, messageEvents) => allEvents.concat(messageEvents), [])
    .map((event) => event.attributes)
    .filter(
      (attributes) =>
        attributes["Message Type"] === "SPIResults" &&
        Object.keys(attributes).some((attributeName) => attributeName.match(/Error.*Details/))
    )
}

const calculateForcesExceptions = (allAttributes: KeyValuePair<string, unknown>[]): ForcesExceptions => {
  return allAttributes.reduce((forces, attributes) => {
    const forceOwner = attributes["Force Owner"] as string
    const forceName = getOrganisationUnitName(forceOwner) ?? "National"
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
  return Object.keys(forcesExceptions).reduce((output, forceName) => {
    const forceExceptions = forcesExceptions[forceName]
    const exceptionLines = Object.keys(forceExceptions).map((exceptionCode) => {
      const errorText = getErrorName(exceptionCode)
      return `${forceName}\t${exceptionCode}\t${errorText}\t${forceExceptions[exceptionCode]}`
    })

    // eslint-disable-next-line no-param-reassign
    output = [output, ...exceptionLines].join("\r\n")

    return output
  }, "Force\tException\tError Text\tCount")
}

export default (messages: AuditLog[]): string => {
  const attributesWithErrors = getAttributesWithErrors(messages)

  const forcesExceptions = calculateForcesExceptions(attributesWithErrors)

  const csvResult = generateCsv(forcesExceptions)

  return csvResult
}
