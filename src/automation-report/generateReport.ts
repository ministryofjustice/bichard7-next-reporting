import { stringify } from "csv-stringify/sync"
import convertCsvToXlsx from "src/shared/csv-to-xlsx"
import { findForceName } from "src/shared/forces"
import type { AuditLog, AuditLogEvent, KeyValuePair } from "src/shared/types"

interface Force {
  exceptions: number
  manuallyResolved: number
  resubmittedAndResolved: number
  automated: number
  automatedQuotient: number
  automatedWithResubmissionQuotient: number
}

interface CalculateForceResult {
  force: Force
  national: Force
}

type Forces = KeyValuePair<string, Force>

const hasExceptions = (events: AuditLogEvent[]) =>
  events.some(
    (e) =>
      ["exceptions.generated", "exceptions.locked", "exceptions.unlocked", "exceptions.resolved"].includes(
        e.eventCode
      ) ||
      [
        "Exceptions generated",
        "Exception locked",
        "Exception unlocked",
        "Exception marked as resolved by user",
        "PNC Update marked as resolved"
      ].includes(e.eventType)
  )

const hasBeenResolvedManually = (events: AuditLogEvent[]) =>
  events.some(
    (e) =>
      e.eventCode === "exceptions.resolved" ||
      ["Exception marked as resolved by user", "PNC Update marked as resolved"].includes(e.eventType)
  )

const hasUpdatedPnc = (events: AuditLogEvent[]) =>
  events.some((e) => e.eventCode === "pnc.updated" || e.eventType === "PNC Update applied successfully") ||
  events.some(
    (e) =>
      (e.eventCode === "pnc.response-received" || e.eventType === "PNC Response received") &&
      e.attributes?.["PNC Request Type"] !== "ENQASI"
  )

const calculateForce = (events: AuditLogEvent[], force: Force, national: Force): CalculateForceResult => {
  const updatedForce = { ...force }
  const updatedNational = { ...national }

  const foundException = hasExceptions(events)
  if (foundException) {
    updatedForce.exceptions += 1
    updatedNational.exceptions += 1
  }

  if (hasBeenResolvedManually(events)) {
    updatedForce.manuallyResolved += 1
    updatedNational.manuallyResolved += 1
  }

  if (hasUpdatedPnc(events)) {
    if (foundException) {
      updatedForce.resubmittedAndResolved += 1
      updatedNational.resubmittedAndResolved += 1
    } else {
      updatedForce.automated += 1
      updatedNational.automated += 1
    }
  }

  return { force: updatedForce, national: updatedNational }
}

const calculateForces = (messages: AuditLog[]): Forces => {
  const forces: KeyValuePair<string, Force> = {}
  const newForce = () => ({
    exceptions: 0,
    manuallyResolved: 0,
    resubmittedAndResolved: 0,
    automated: 0,
    automatedQuotient: 0,
    automatedWithResubmissionQuotient: 0
  })

  let national = newForce()

  messages.forEach((message) => {
    const { forceOwner, events } = message
    const forceName = findForceName(forceOwner) || "Unknown"
    const force = (forceName && forces[forceName]) || newForce()
    const calculateForceResult = calculateForce(events, force, national)
    national = calculateForceResult.national
    if (forceName !== "Unknown") {
      forces[forceName] = calculateForceResult.force
    }
  })

  forces.national = national

  Object.keys(forces).forEach((forceName) => {
    const force = forces[forceName]
    const { automated, exceptions, manuallyResolved, resubmittedAndResolved } = force
    const automatedWithResubmissionDivider = automated + resubmittedAndResolved + exceptions - manuallyResolved

    if (automatedWithResubmissionDivider > 0) {
      force.automatedQuotient = (automated / automatedWithResubmissionDivider) * 100
      force.automatedWithResubmissionQuotient =
        ((automated + resubmittedAndResolved) * 100) / automatedWithResubmissionDivider
    }
  })

  return forces
}

const generateCsvLines = (date: Date, forces: Forces): string[][] => {
  const lines = [
    [`Bichard 7 Resubmissions - ${date.toDateString().split(" ")[1]} ${date.getUTCFullYear()}`],
    ["Force", "FullAutomation", "Number of Resubmissions", "Automated inc. Resubmissions"]
  ]
  const addLine = (forceName: string, name?: string) => {
    const force = forces[forceName]
    const automated = force.automatedQuotient.toFixed(2)
    const resubmittedAndResolved = force.resubmittedAndResolved.toFixed(0)
    const automatedWithResubmission = force.automatedWithResubmissionQuotient.toFixed(2)
    lines.push([`${name || forceName}`, `${automated}%`, `${resubmittedAndResolved}`, `${automatedWithResubmission}%`])
  }

  Object.keys(forces)
    .filter((forceName) => forceName !== "national")
    .sort()
    .forEach((forceName: string) => addLine(forceName))

  addLine("national", "National Average")

  return lines
}

export default (date: Date, events: AuditLog[]): Buffer => {
  const forces = calculateForces(events)

  const csvLinesResult = generateCsvLines(date, forces)

  const title = csvLinesResult.shift()?.[0]
  const xlsxResult = convertCsvToXlsx(stringify(csvLinesResult), title)

  return xlsxResult
}
