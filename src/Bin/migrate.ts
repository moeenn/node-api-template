import "module-alias/register"
import SQL from "@src/Infra/Database/Init"
import fs from "fs/promises"

const log = console.log

/**
 *  after a migration has been successfully executed, make an entry in the 
 *  migrations table
*/
async function markMigrationAsExecuted(migration: string): Promise<void> {
  const now = Date.now()

  await SQL`
    INSERT INTO migrations (file, applied_at)
    VALUES (${migration}, ${now})
  `
}

/**
 *  when the migrations are executed for the first time, the migrations
 *  table will not exist, here we check if this table exists or not
*/
async function migrationsTableExists(): Promise<boolean> {
  const [row] = await SQL`
    SELECT EXISTS (
      SELECT FROM pg_tables
      WHERE 
        schemaname = 'public' AND
        tablename = 'migrations'
    )
  `

  return row.exists
}

/**
 *  check if a migration has already been applied
 * 
*/
async function isMigrationApplied(migration: string): Promise<boolean> {
  const tableExists = await migrationsTableExists() 
  if (!tableExists) return false

  const [row] = await SQL`
    SELECT COUNT(*) 
    FROM migrations
    WHERE file = ${migration}
  `

  return row.count === "1"
}

async function init(): Promise<void> {
  const migrationsPath = "build/Infra/Database/Migrations/"
  const migrations = await fs.readdir(migrationsPath)

  log("Running migrations")

  for (const migration of migrations) {
    const isApplied = await isMigrationApplied(migration)
    if (isApplied) {
      continue
    }

    try {
      const script = await import("../../" + migrationsPath + migration)
      await script.default()

      await markMigrationAsExecuted(migration)
      log(migration)
    } catch (err) {
      log("Failed to run migration: ", err)
      process.exit(1)
    }
  }

  process.exit(0)
}

init()