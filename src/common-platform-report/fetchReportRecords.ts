/* eslint-disable require-await */
import axios from "axios"
import type { AuditLog } from "src/shared/types"
import config from "./config"

export default async (lastMessageId?: string): Promise<AuditLog[]> => {
  let lastMessageIdQuery = ""
  if (lastMessageId) {
    lastMessageIdQuery = `&lastMessageId=${lastMessageId}`
  }

  return axios
    .get<AuditLog>(`${config.apiUrl}/messages?status=Error${lastMessageIdQuery}`, {
      headers: { "X-API-Key": config.apiKey }
    })
    .then((result) => result.data)
    .catch((e) => e)
}
