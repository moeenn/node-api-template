import { describe, it, expect } from "vitest"
import { isJSON } from "./isJSON"

describe("isJSON helper", () => {
  it("valid JSON is passed", () => {
    const json = '{"message":"random message"}'
    const result = isJSON(json)
    expect(result).toBe(true)
  })

  it("invalid JSON is passed", () => {
    const notJSON = "[] some random string"
    const result = isJSON(notJSON)
    expect(result).toBe(false)
  })
})
