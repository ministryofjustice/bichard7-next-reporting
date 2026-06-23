import { endOfMonth, startOfMonth, subMonths } from "date-fns"

export type TimeRange = {
  start: Date
  end: Date
}

export default (now: Date): TimeRange => {
  const start = startOfMonth(subMonths(now, 1))
  const end = endOfMonth(subMonths(now, 1))

  return { start, end }
}
