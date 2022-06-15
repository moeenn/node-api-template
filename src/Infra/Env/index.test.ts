import { describe, it, expect } from "vitest"
import Env from "."

describe("loading of environment variables", () => {
  it("environment variables are not loaded in production mode", () => {
    expect(process.env.SERVER_HOST).toBeUndefined()
    expect(() => {
      new Env({ production: true })
    }).toThrow()
  })

  it("environment variables are loaded in dev mode", () => {
    expect(process.env.SERVER_HOST).toBeUndefined()

    const env = new Env({ production: false })
    const value = env.read("SERVER_HOST")

    expect(value).toBeDefined()
    expect(value).toBe(process.env.SERVER_HOST)
  })
})