import { describe, it, expect } from "vitest"
import { objectID } from "./objectID"

describe("MongoDB ObjectID custom validator", () => {
  it("test valid object ids", () => {
    const ids = [
      "637b72bd72280461fefcad8b",
      "6385c96072280461fefcb554",
      "639c09af72280461fefcd354",
    ]

    for (const id of ids) {
      const result = objectID.handler(id)
      expect(result).toBe(true)
    }
  })

  it("test invalid object ids", () => {
    const ids = [
      "637b72bd72280461fefcad8b111111",
      "6385c96072280461fefc112x",
      "sample",
    ]

    for (const id of ids) {
      const result = objectID.handler(id)
      expect(result).toBe(false)
    }
  })
})
