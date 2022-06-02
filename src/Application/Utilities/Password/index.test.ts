import "module-alias-jest/register"
import Password from "."

describe("password hashing and validation functions", () => {
  const passwords = [
    "some_random_password",
    "213Banana",
    "123456789012345678901234567890-__@#!@#!#",
    "pas",
  ]

  it("create hash of password and verify", async () => {
    for (const password of passwords) {
      const hashed = await Password.Hash(password)

      // password field in db is usually varchar (255)
      expect(hashed.length).toBeLessThan(255)
      expect(await Password.Verify(hashed, password)).toBe(true)
    }
  })
})