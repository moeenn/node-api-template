export const Dates = {
  /** check if the provided string is a valid date */
  isDateValid(date: string): boolean {
    const parsed = Date.parse(date)
    return isNaN(parsed) == false
  },

  /** provided a date as string, calculate the previous day's date */
  previousDay(dateString: string): Date {
    const date = new Date(dateString)

    const previous = new Date(date.getTime())
    previous.setDate(date.getDate() - 1)

    return previous
  },

  /** get day name for specific date */
  getDateDay(date: string): string {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const
    const d = new Date(date)
    return days[d.getDay()]
  },

  /** provided array of objects, group by field "date" (of type Date) */
  groupByDate(data: { date: Date }[]): Record<string, unknown[]> {
    const key = "date" as const
    const uniqueVals = data
      .map((d) => d[key])
      .sort(
        (a, b) => a.getTime() - b.getTime(),
      ) /** a - b means ascending sort */

    const result: Record<string, unknown[]> = {}
    for (const val of uniqueVals) {
      result[val.toISOString()] = data.filter(
        (d) => new Date(d[key]).getTime() === val.getTime(),
      )
    }

    return result
  },

  currentDate(): Date {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  },

  getDateByDelta(date: Date, deltaDays: number): Date {
    const newDate = new Date(date.getTime())
    newDate.setDate(date.getDate() + deltaDays)

    return newDate
  },
}
