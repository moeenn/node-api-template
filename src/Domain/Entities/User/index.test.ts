import "module-alias/register"
import { describe, it, expect } from "vitest"
import User from "."

describe("validations on user entity creation", () => {
  it("successfull user creations", () => {
    const scenarios = [
      {
        name: "Sample",
        email: "sample@site.com",
        password: "password",
      },
      {
        id: "30000asc1301",
        name: "Example",
        email: "sample@site.com",
        password: "passwordzzz",
      },
    ]

    for (const scenario of scenarios) {
      const user = new User(scenario)
      expect(user.name).toBe(scenario.name)
      expect(user.password).toBe(scenario.password)
    }
  })

  it("fail user creations", () => {
    const scenarios = [
      {
        name: "Sample",
        email: "sample",
        password: "password",
      },
      {
        id: "30000asc1301",
        name: "Example",
        email: "sample@site.com",
        password: "pas",
      },
    ]

    for (const scenario of scenarios) {
      expect(() => new User(scenario)).toThrow()
    }
  })
})