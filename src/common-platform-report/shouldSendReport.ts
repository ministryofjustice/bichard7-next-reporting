export default (time: Date, validHours: number[]): boolean => {
  const londonTime = time.toLocaleTimeString("en-GB", { timeZone: "Europe/London" })
  const hour = parseInt(londonTime.split(":")[0], 10)
  return validHours.includes(hour)
}
