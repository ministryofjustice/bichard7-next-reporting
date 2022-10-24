import convertCsvToXlsx from "@bichard/csv-to-xlsx"
import { findForceName } from "@bichard/forces"
import type { AuditLog, AuditLogEvent, KeyValuePair } from "@bichard/types"
import { stringify } from "csv-stringify/sync"

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

const exceptionsCategoryEventTypes = [
  "Hearing Outcome passed to Error List",
  "Exceptions generated",
  "PNC Update added to Error List (PNC message construction)",
  "PNC Update added to Error List (Unexpected PNC response)",
  "Exception marked as resolved by user"
]
const manuallyResolvedCategoryEventType = "Exception marked as resolved by user"
const pncUpdateSuccessfullyEventType = "PNC Update applied successfully"

const calculateForce = (events: AuditLogEvent[], force: Force, national: Force): CalculateForceResult => {
  const sortedEvents = events.sort((eventA, eventB) => (eventA.timestamp > eventB.timestamp ? 1 : -1))
  const updatedForce = { ...force }
  const updatedNational = { ...national }

  let foundException = false
  sortedEvents.forEach((event) => {
    const { eventType } = event

    if (exceptionsCategoryEventTypes.includes(eventType)) {
      updatedForce.exceptions += 1
      updatedNational.exceptions += 1
      foundException = true
    } else if (eventType === manuallyResolvedCategoryEventType) {
      updatedForce.manuallyResolved += 1
      updatedNational.manuallyResolved += 1
    } else if (eventType === pncUpdateSuccessfullyEventType) {
      updatedForce.automated += 1
      updatedNational.automated += 1

      if (foundException) {
        updatedForce.resubmittedAndResolved += 1
        updatedNational.resubmittedAndResolved += 1
      }
    }
  })

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
    const forceName = findForceName(forceOwner)

    if (!forceName || forceName === "National") {
      return
    }

    const force = forces[forceName] || newForce()

    const calculateForceResult = calculateForce(events, force, national)
    national = calculateForceResult.national
    forces[forceName] = calculateForceResult.force
  })

  forces.national = national

  Object.keys(forces).forEach((forceName) => {
    const force = forces[forceName]
    const { automated, exceptions, manuallyResolved, resubmittedAndResolved } = force
    const automatedWithResubmissionDivider = automated + exceptions - manuallyResolved

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
