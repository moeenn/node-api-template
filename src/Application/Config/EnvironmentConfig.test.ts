import { describe, it, expect } from "vitest"
import fs from "node:fs"
import { EnvironmentConfig } from "./EnvironmentConfig"

describe("EnvironmentConfig test", () => {
  const environmentConfig = new EnvironmentConfig()

  it("configured env file exists", () => {
    const exists = fs.existsSync(environmentConfig.file)
    expect(exists).toBe(true)
  })
})
