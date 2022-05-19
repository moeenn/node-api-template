import "module-alias-jest/register"
import User from "./User"
import scenarios from "./User.test.json"

describe("validations on user entity creation", () => {
  const { success, fail } = scenarios

  it("successfull user creations", () => {
    for (const scenario of success) {
      const user = new User(scenario)
      expect(user.name).toBe(scenario.name)
      expect(user.password).toBe(scenario.password)
    }
  })

  it("fail user creations", () => {
    for (const scenario of fail) {
      expect(() => new User(scenario)).toThrow()
    }
  })
})