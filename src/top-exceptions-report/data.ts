import type { AuditLog } from "src/shared/types"
import messages from "./test/dummyMessages"

const extractForceOwner = (msg: AuditLog): number | undefined => {
  const events = msg.events.filter((e) => e.attributes["Force Owner"])
  if (events.length === 0) {
    return undefined
  }
  const forceOwnerStr = events[0].attributes["Force Owner"] as string
  return Number(forceOwnerStr.substring(0, 2))
}

const reformatMsg = (msg: AuditLog): AuditLog => {
  msg.events = msg.topExceptionsReport?.events ?? []
  msg.forceOwner = extractForceOwner(msg)
  delete msg.topExceptionsReport
  delete msg.automationReport
  return msg
}
const newMsgs = messages(new Date())

const reformattedMsgs = newMsgs.map(reformatMsg)

console.log(JSON.stringify(reformattedMsgs, null, 2))
