import { describe, it, expect } from "vitest"
import { env } from "./env"

describe("env helper", () => {
  it("get env value which is already set", () => {
    const result = env("NODE_ENV")
    expect(result).toBe("test")
  })

  it("get env value which hasn't been set", () => {
    const call = () => env("SOME_RANDOM_SHITTY_VALUE")
    expect(call).toThrowError("not set")
  })
})
