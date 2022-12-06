import { describe, it, expect } from "vitest"

import { EnvironmentConfig } from "@/Application/Config"
import { NodeEnv } from "@/Vendor/Entities/NodeEnv"
import { EnvironmentBootstrap } from "./EnvironmentBootstrap"

describe("EnvironmentBootstrap test", () => {
  const environmentConfig = new EnvironmentConfig()

  it("should not load file in production", () => {
    /**
     *  constructing EnvironmentBootstrap will also validate existence of
     *  all required environment variables
     */
    loadRequiredEnvironVariables(environmentConfig.required)

    const nodeEnv = new NodeEnv("production")
    const environmentBootstrap = new EnvironmentBootstrap(
      environmentConfig,
      nodeEnv,
    )

    environmentBootstrap.bootstrap()
    expect(environmentBootstrap.fileLoaded).toBe(false)
  })

  it("should load file in development", () => {
    const nodeEnv = new NodeEnv("development")
    const environmentBootstrap = new EnvironmentBootstrap(
      environmentConfig,
      nodeEnv,
    )

    environmentBootstrap.bootstrap()
    expect(environmentBootstrap.fileLoaded).toBe(true)
  })
})

/**
 *  temporarily set all required env variables
 *
 */
function loadRequiredEnvironVariables(required: string[]) {
  for (const v of required) {
    process.env[v] = "something"
  }
}
