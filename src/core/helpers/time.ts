export class Time {
  hours: number
  minutes: number

  constructor(hours: number, minutes: number) {
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      throw new Error(`invalid time: ${hours}:${minutes}`)
    }

    this.hours = hours
    this.minutes = minutes
  }

  /** parse provided string as Time */
  public static parseString(time: string): Time | undefined {
    const pieces = time.split(":")
    if (pieces.length !== 2) return

    const parse = (raw: string) =>
      !isNaN(parseInt(raw)) ? parseInt(raw) : undefined
    const hours = parse(pieces[0])
    const minutes = parse(pieces[1])

    if (hours == undefined || hours < 0 || hours > 23) return
    if (minutes == undefined || minutes < 0 || minutes > 59) return

    return new Time(hours, minutes)
  }

  public toString(): string {
    const pad = (n: number) => n.toString().padStart(2, "0")
    return `${pad(this.hours)}:${pad(this.minutes)}`
  }

  /** calculate cumulative minutes for the day from parsed time */
  public toMins(): number {
    return this.hours * 60 + this.minutes
  }

  public addDuration(durationHours: number, durationMinutes: number): Time {
    const mins = this.minutes + durationMinutes

    return new Time(
      ((this.hours + durationHours) % 24) + Math.floor(mins / 60),
      mins % 60,
    )
  }

  public static addDurationToTimeString(
    startTime: string,
    durationHours: number,
    durationMinutes: number,
  ): string | undefined {
    const parsedStart = this.parseString(startTime)
    if (!parsedStart) return

    const endTime = parsedStart.addDuration(durationHours, durationMinutes)

    return endTime.toString()
  }

  /** calculate difference between two Time objects */
  public static timeDelta(start: Time, end: Time): Time {
    const startMins = start.toMins()
    const endMins = end.toMins()

    let delta = endMins - startMins
    if (delta < 0) {
      const midnightMins = new Time(23, 59).toMins() + 1
      delta = Math.abs(delta + midnightMins)
    }

    return new Time(Math.floor(delta / 60) % 24, delta % 60)
  }

  public static timeToMidnight(time: Time): Time {
    const midnight = new Time(23, 59)
    midnight.minutes += 1
    return this.timeDelta(time, midnight)
  }

  /** start and end minutes are included */
  public static isWithinTimeRange(
    start: Time,
    end: Time,
    current: Time,
  ): boolean {
    const currentMins = current.toMins()
    return currentMins >= start.toMins() && currentMins <= end.toMins()
  }

  public static currentTime(): Time {
    const date = new Date()
    return new Time(date.getHours(), date.getMinutes())
  }
}
