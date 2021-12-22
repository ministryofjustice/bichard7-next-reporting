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
  "PNC Update added to Error List",
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
    const { forceOwner, events } = message.automationReport
    const forceName = findForceName(forceOwner)

    if (!forceName) {
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
      force.automatedQuotient = automated / automatedWithResubmissionDivider
      force.automatedWithResubmissionQuotient = (automated + resubmittedAndResolved) / automatedWithResubmissionDivider
    }
  })

  return forces
}

const generateCsv = (forces: Forces): string => {
  const lines = [["Force", "Automated", "Resubmitted", "Automated including Resubmissions"]]
  const addLine = (forceName: string, name?: string) => {
    const force = forces[forceName]
    const automated = force.automatedQuotient.toFixed(5)
    const resubmittedAndResolved = force.resubmittedAndResolved.toFixed(5)
    const automatedWithResubmission = force.automatedWithResubmissionQuotient.toFixed(5)
    lines.push([`${name || forceName}`,`${automated}`,`${resubmittedAndResolved}`,`${automatedWithResubmission}`])
  }

  Object.keys(forces)
    .filter((forceName) => forceName !== "national")
    .sort()
    .forEach((forceName: string) => addLine(forceName))

  addLine("national", "National Average")

  //return lines.join("\n")
  return stringify(lines)
}

export default (events: AuditLog[]): string => {
  const forces = calculateForces(events)

  const csvResult = generateCsv(forces)

  return csvResult
}
