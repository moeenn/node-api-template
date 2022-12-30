import { describe, it, expect } from "vitest"
import { domain } from "./domain"

describe("Domain name custom validator", () => {
  it("test valid domains", () => {
    const domains = ["site.com", "example.co.uk", "domain.gov"]
    for (const d of domains) {
      const result = domain.handler(d)
      expect(result).toBe(true)
    }
  })

  it("test invalid domains", () => {
    const domains = ["site@com", "examplesite", "domain@domain.com"]
    for (const d of domains) {
      const result = domain.handler(d)
      expect(result).toBe(false)
    }
  })
})
