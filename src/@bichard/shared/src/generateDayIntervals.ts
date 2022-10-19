import type { Interval } from "@bichard/types"

const generateDayIntervals = ({ start, end }: Interval): Interval[] => {
  const days: Interval[] = []
  let dayStart = start
  let dayEnd: Date
  do {
    dayEnd = new Date(dayStart.getTime() + 86400000)
    if (dayEnd > end) {
      dayEnd = end
    }
    days.push({ start: dayStart, end: dayEnd })
    dayStart = dayEnd
  } while (dayEnd < end)
  return days
}

export default generateDayIntervals
