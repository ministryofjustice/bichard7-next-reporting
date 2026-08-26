/* eslint-disable require-await */
import type { AuditLog } from "src/shared/types"
import config from "./config"

export default async (lastMessageId?: string): Promise<AuditLog[]> => {
  let lastMessageIdQuery = ""
  if (lastMessageId) {
    lastMessageIdQuery = `&lastMessageId=${lastMessageId}`
  }

  return fetch
    (`${config.apiUrl}/messages?status=Error${lastMessageIdQuery}`, {
      headers: { "X-API-Key": config.apiKey }
    })
    .then((result) => result.json() as Promise<AuditLog>)
    .catch((e) => e)
}
