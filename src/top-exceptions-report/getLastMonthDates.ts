import { endOfMonth, startOfMonth, subMonths } from "date-fns"
import { toZonedTime, toDate } from "date-fns-tz"

export type TimeRange = {
  start: Date
  end: Date
}

export default (now: Date): TimeRange => {
  const timeZone = "Europe/London"

  const zonedNow = toZonedTime(now, timeZone)

  const zonedStart = startOfMonth(subMonths(zonedNow, 1))
  const zonedEnd = endOfMonth(subMonths(zonedNow, 1))

  return {
    start: toDate(zonedStart, { timeZone }),
    end: toDate(zonedEnd, { timeZone })
  }
}
