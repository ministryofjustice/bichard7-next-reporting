import type { AuditLog } from "src/shared/types"
import getConfig from "./config"

export default async (lastMessageId?: string): Promise<AuditLog[]> => {
  let lastMessageIdQuery = ""
  if (lastMessageId) {
    lastMessageIdQuery = `&lastMessageId=${lastMessageId}`
  }

  const config = await getConfig()

  return fetch(`${config.apiUrl}/messages?status=Error${lastMessageIdQuery}`, {
    headers: { "X-API-Key": config.apiKey }
  })
    .then((result) => {
      if (!result.ok) {
        throw new Error(`Fetch failed - Status: ${result.statusText}`)
      }

      return result.json() as Promise<AuditLog>
    })
    .catch((e) => e)
}
