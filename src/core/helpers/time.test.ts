import { describe, it, expect } from "vitest"
import { Time } from "./time"

describe("Time", () => {
  it("parseString", () => {
    const testCases = [
      { input: "10:20", expected: new Time(10, 20) },
      { input: "12:00", expected: new Time(12, 0) },
      { input: "23:01", expected: new Time(23, 1) },
      { input: "0:0", expected: new Time(0, 0) },
      { input: "a:b", expected: undefined },
      { input: "-2:-30", expected: undefined },
      { input: "30:00", expected: undefined },
      { input: "10:70", expected: undefined },
    ]

    for (const testCase of testCases) {
      const got = Time.parseString(testCase.input)
      expect(got).toStrictEqual(testCase.expected)
    }
  })

  it("formatParsedTime", () => {
    const testCases = [
      { input: new Time(10, 30), output: "10:30" },
      { input: new Time(1, 5), output: "01:05" },
    ]

    for (const testCase of testCases) {
      const got = testCase.input.toString()
      expect(got).toBe(testCase.output)
    }
  })

  it("addDuration", () => {
    const testCases = [
      {
        input: {
          startTime: new Time(10, 0),
          durationHours: 2,
          durationMinutes: 0,
        },
        expected: new Time(12, 0),
      },
      {
        input: {
          startTime: new Time(2, 30),
          durationHours: 3,
          durationMinutes: 30,
        },
        expected: new Time(6, 0),
      },
      {
        input: {
          startTime: new Time(23, 0),
          durationHours: 1,
          durationMinutes: 30,
        },
        expected: new Time(0, 30),
      },
    ]

    for (const testCase of testCases) {
      const got = testCase.input.startTime.addDuration(
        testCase.input.durationHours,
        testCase.input.durationMinutes,
      )

      expect(got).toStrictEqual(testCase.expected)
    }
  })

  it("addDurationToTimeString", () => {
    const testCases = [
      {
        input: {
          startTime: "10:00",
          durationHours: 2,
          durationMinutes: 30,
        },
        expected: "12:30",
      },
      {
        input: {
          startTime: "08:00",
          durationHours: 8,
          durationMinutes: 0,
        },
        expected: "16:00",
      },
      {
        input: {
          startTime: "23:00",
          durationHours: 3,
          durationMinutes: 30,
        },
        expected: "02:30",
      },
    ]

    for (const testCase of testCases) {
      const got = Time.addDurationToTimeString(
        testCase.input.startTime,
        testCase.input.durationHours,
        testCase.input.durationMinutes,
      )

      expect(got).toStrictEqual(testCase.expected)
    }
  })

  it("toMins", () => {
    const input = new Time(2, 30)
    const expected = 150
    const got = input.toMins()

    expect(got).toBe(expected)
  })

  it("timeDelta", () => {
    const testCases = [
      {
        input: {
          start: new Time(10, 30),
          end: new Time(12, 0),
        },
        expected: new Time(1, 30),
      },
      {
        input: {
          start: new Time(23, 30),
          end: new Time(0, 30),
        },
        expected: new Time(1, 0),
      },
      {
        input: {
          start: new Time(22, 45),
          end: new Time(1, 15),
        },
        expected: new Time(2, 30),
      },
    ]

    for (const testCase of testCases) {
      const got = Time.timeDelta(testCase.input.start, testCase.input.end)
      expect(got).toStrictEqual(testCase.expected)
    }
  })

  it("timeToMidnight", () => {
    const testCases = [
      {
        input: new Time(23, 0),
        expected: new Time(1, 0),
      },
      {
        input: new Time(23, 45),
        expected: new Time(0, 15),
      },
      {
        input: new Time(20, 30),
        expected: new Time(3, 30),
      },
    ]

    for (const testCase of testCases) {
      const got = Time.timeToMidnight(testCase.input)
      expect(got).toStrictEqual(testCase.expected)
    }
  })

  it("isWithinTimeRange", () => {
    const testCases = [
      {
        input: {
          start: new Time(10, 0),
          end: new Time(18, 0),
          current: new Time(13, 30),
        },
        expected: true,
      },
      {
        input: {
          start: new Time(6, 30),
          end: new Time(12, 0),
          current: new Time(12, 1),
        },
        expected: false,
      },
      {
        input: {
          start: new Time(6, 0),
          end: new Time(12, 0),
          current: new Time(6, 0),
        },
        expected: true,
      },
      {
        input: {
          start: new Time(10, 0),
          end: new Time(12, 0),
          current: new Time(10, 0),
        },
        expected: true,
      },
    ]

    for (const testCase of testCases) {
      const got = Time.isWithinTimeRange(
        testCase.input.start,
        testCase.input.end,
        testCase.input.current,
      )

      expect(got).toBe(testCase.expected)
    }
  })
})
