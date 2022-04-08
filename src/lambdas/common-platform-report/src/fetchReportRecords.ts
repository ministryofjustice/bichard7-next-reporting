/* eslint-disable require-await */
import type { AuditLog } from "@bichard/types"
import config from "./config"
import axios from "axios"

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
