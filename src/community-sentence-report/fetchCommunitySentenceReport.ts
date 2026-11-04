import { createJwt } from "src/shared/createJwt"
import type { Interval, PromiseResult } from "src/shared/types"
import type CommunitySentenceReport from "src/shared/types/CommunitySentenceReport"
import type { ApiConfig } from "./config"

const fetchCommunitySentenceReport = (
  { start, end }: Interval,
  config: ApiConfig
): PromiseResult<CommunitySentenceReport[]> => {
  const startTime = new Date().getTime()
  const params = new URLSearchParams({
    fromDate: start.toISOString().split("T")[0],
    toDate: end.toISOString().split("T")[0],
    exceptions: "true",
    triggers: "true"
  })
  const url = `${config.apiUrl}?${params}`

  return fetch(url, {
    headers: { Authorization: createJwt() }
  })
    .then((result) => {
      if (!result.ok) {
        const message =
          result.status === 504
            ? `Request timed out. Duration: ${(new Date().getTime() - startTime) / 1000}`
            : `HTTP Error: ${result.status}`
        throw new Error(message)
      }

      return result.json() as Promise<CommunitySentenceReport[]>
    })
    .catch((e: Error) => {
      console.error("Fetching community sentence report failed: ", url)
      return e
    })
}

export default fetchCommunitySentenceReport
