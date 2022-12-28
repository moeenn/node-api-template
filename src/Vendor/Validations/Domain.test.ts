import { describe, it, expect } from "vitest"
import { Domain } from "./Domain"

describe("Domain name custom validator", () => {
  it("test valid domains", () => {
    const domains = ["site.com", "example.co.uk", "domain.gov"]
    for (const domain of domains) {
      const result = Domain.handler(domain)
      expect(result).toBe(true)
    }
  })

  it("test invalid domains", () => {
    const domains = ["site@com", "examplesite", "domain@domain.com"]
    for (const domain of domains) {
      const result = Domain.handler(domain)
      expect(result).toBe(false)
    }
  })
})
