export type TimeRange = {
  start: Date
  end: Date
}

export default (now: Date): TimeRange => {
  const end = new Date(now.getFullYear(), now.getMonth())
  const start = new Date(now.getFullYear(), now.getMonth() - 1)
  return { start, end }
}
