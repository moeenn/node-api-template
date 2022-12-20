import { describe, it, expect } from "vitest"
import { NodeEnv } from "./index"

describe("NodeEnv test", () => {
  it("NodeEnv mode override", () => {
    const nodeEnv = new NodeEnv("sample")
    expect(nodeEnv.mode).toBe("sample")
  })

  it("NodeEnv default mode", () => {
    const nodeEnv = new NodeEnv()
    expect(nodeEnv.mode).toBe("test")
  })
})
