import type { Interval } from "src/shared/types"

export default (now: Date): Interval => {
  const end = new Date(now.getFullYear(), now.getMonth())
  const start = new Date(now.getFullYear(), now.getMonth() - 1)
  return { start, end }
}
