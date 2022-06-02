import "module-alias/register"
import fs from "fs/promises"
import { IsMigrationApplied, MarkMigrationAsExecuted } from "./Queries"

/**
 *  read the migration script and run the queries inside
 * 
*/
async function migrate(importBase: string, migrations: string[]): Promise<void> {
  for (const migration of migrations) {
    const isApplied = await IsMigrationApplied(migration)
    if (isApplied) {
      continue
    }

    try {
      const script = await import(importBase + migration)
      await script.default()

      await MarkMigrationAsExecuted(migration)
      console.log(migration)
    } catch (err) {
      console.error("Failed to run migration: ", err)
      process.exit(1)
    }
  }
}

async function init(): Promise<void> {
  const migrationsPath = "build/Infra/Database/Migrations/"
  const importBasePath = "../../" + migrationsPath
  const migrations = await fs.readdir(migrationsPath)

  console.log("Running migrations")
  await migrate(importBasePath, migrations)

  console.log("All migrations run successfully")
  process.exit(0)
}

init()