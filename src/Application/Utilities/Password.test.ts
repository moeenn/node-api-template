import "module-alias-jest/register"
import Password from "./Password"

describe("password hashing and validation functions", () => {
  const passwords = [
    "some_random_password",
    "213Banana",
    "123456789012345678901234567890-__@#!@#!#",
    "pas",
  ]

  it("create hash of password and verify", () => {
    for (const password of passwords) {
      const hashed = Password.Hash(password)
      const pieces = hashed.split("__")

      expect(pieces.length).toBe(2)
      expect(hashed.length).toBeLessThan(255)
      expect(Password.Verify(hashed, password)).toBe(true)
    }
  })
})