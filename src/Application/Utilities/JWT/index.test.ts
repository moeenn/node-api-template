import jwt from "."

describe("check creation and verification of jwt", () => {
  const signingKey = "abc123"
  const user = {
    id: "300-400-500",
    email: "sample@site.com",
    name: "Sample",
    password: "hashed_pwd",
  }

  it("generate jwt", () => {
    const token = jwt.Create(user, signingKey)
    expect(token.constructor).toBe(String)
  })

  it("verify jwt", () => {
    const token = jwt.Create(user, signingKey)
    const verified = jwt.Verify(token, signingKey)

    expect(verified).toBeDefined()
    if (verified) {
      expect(verified.id).toBe(user.id)
      expect(verified.email).toBe(user.email)
    }
  })

  it("invalid token", () => {
    const verified = jwt.Verify("something", signingKey)
    expect(verified).toBeUndefined()
  })

  it("invalid signingKey", () => {
    const token = jwt.Create(user, signingKey)
    const verified = jwt.Verify(token, "something")
    
    expect(verified).toBeUndefined()
  })
})