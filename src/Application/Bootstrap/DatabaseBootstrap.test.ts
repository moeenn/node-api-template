import { describe, it, expect } from "vitest"
import { DatabaseConfig } from "@/Application/Config"
import { MongooseMock } from "@/Vendor/Entities/Mongoose"
import { DatabaseBootstrap } from "./DatabaseBootstrap"

describe("DatabaseBootstrap test", () => {
  const mongoose = new MongooseMock()
  const dbConfig = new DatabaseConfig(
    "host",
    "port",
    "db",
    "username",
    "password",
  )

  const databaseBootstrap = new DatabaseBootstrap(dbConfig, mongoose)

  it("correct connection URL", () => {
    databaseBootstrap.bootstrap()

    const components = ["host", "port", "db", "username", "password"]
    const hasAllComponents = stringHasComponents(mongoose.URI, components)

    expect(hasAllComponents).toBe(true)
  })
})

/**
 *  checks if all elements in the provided array of components (i.e. substrings)
 *  are present in the base string
 *
 */
function stringHasComponents(base: string, components: string[]): boolean {
  for (const component of components) {
    if (!base.includes(component)) {
      return false
    }
  }

  return true
}
