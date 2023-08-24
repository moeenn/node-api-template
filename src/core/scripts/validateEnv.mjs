// @ts-check
import fs from "node:fs"

/**
 * read the project's package.json file and return its content
 * @returns {{ env: any }}
 */
function readPackageJSON() {
  const file = fs.readFileSync("./package.json")
  if (!file) {
    throw new Error("No package.json file found in the current directory")
  }

  let json
  try {
    json = JSON.parse(file.toString())
  } catch (error) {
    throw new Error("Failed to parse package.json file")
  }

  return json
}

/**
 * read the defined required environment variables and perform sanity checks
 * on the provided values
 *
 * @param {{ env: any }} packageJSON
 * @returns {string[]}
 */
function extractRequiredEnvVars(packageJSON) {
  const { env: requiredEnv } = packageJSON
  if (!requiredEnv) {
    throw new Error("'env' key missing in package.json file")
  }

  if (!Array.isArray(requiredEnv)) {
    throw new Error("'env' key must be a valid Array")
  }

  if (!requiredEnv.length) {
    throw new Error("No variable names defined inside 'env'")
  }

  if (!requiredEnv.every((v) => typeof v === "string" || v instanceof String)) {
    throw new Error(
      "Only Strings should be defined as envrionment variable names",
    )
  }

  return requiredEnv
}

/**
 * check if all required environment variables are actually present in the
 * environment
 *
 * @param {string[]} required
 */
function validateRequiredEnvVars(required) {
  const isEmpty = (value) => value == null || value == undefined || value == ""

  /** @type {string[]} */
  const missing = []

  for (const name of required) {
    const value = process.env[name]
    if (isEmpty(value)) {
      missing.push(name)
    }
  }

  return missing
}

/** @returns {Promise<void>} */
async function main() {
  const json = readPackageJSON()
  const required = extractRequiredEnvVars(json)
  const missing = validateRequiredEnvVars(required)

  if (missing.length) {
    console.error("Error: Required environment variables missing:", missing)
    process.exit(1)
  }
}

main().catch((e) => {
  console.error("Error:", e.message)
  process.exit(1)
})
