export type TimeRange = {
  start: Date
  end: Date
}

export default (now: Date, hours: number): TimeRange => {
  const end = new Date(now.getTime() - (now.getTime() % (60 * 60000)))
  return {
    start: new Date(end.getTime() - hours * 60 * 60000),
    end
  }
}
