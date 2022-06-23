import "reflect-metadata"
import "module-alias/register"

import { Service, Container } from "typedi"
import Database from "@/Infra/Database/Database"
import fs from "fs/promises"

@Service()
class MigrateService {
  private migrationPath: string
  private db: Database

  constructor(db: Database) {
    this.db = db
    this.migrationPath = "src/Infra/Database/Migrations/"
  }

  public async listMigrations(): Promise<string[]> {
    const migrations = await fs.readdir(this.migrationPath)
    return [...migrations]
  }

  /**
   *  when the migrations are executed for the first time, the migrations
   *  table will not exist, here we check if this table exists or not
  */
  private async migrationsTableExists(): Promise<boolean> {
    const [row] = await this.db.sql`
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
  private async isMigrationApplied(migration: string): Promise<boolean> {
    const tableExists = await this.migrationsTableExists()
    if (!tableExists) return false

    const [row] = await this.db.sql`
      SELECT COUNT(*) 
      FROM migrations
      WHERE file = ${migration}
    `
    return row.count === "1"
  }

  /**
   *  after a migration has been successfully executed, make an entry in the 
   *  migrations table
  */
  private async markMigrationAsExecuted(migration: string): Promise<void> {
    const now = Date.now()

    await this.db.sql`
      INSERT INTO migrations (file, applied_at)
      VALUES (${migration}, ${now})
    `
  }

  public async migrate(): Promise<void> {
    const migrations = await this.listMigrations()

    for (const migration of migrations) {
      const isApplied = await this.isMigrationApplied(migration)
      if (isApplied) {
        continue
      }

      const path = this.migrationPath + migration
      try {
        await this.db.sql.file(path)
        await this.markMigrationAsExecuted(migration)
        console.log("[Done] ", migration)
      } catch (err) {
        console.error(`Failed to run migrations:: ${migration}`, err)
        process.exit(1)
      }
    }

    console.log("Migration complete!")
    process.exit(0)
  }
}

async function init(): Promise<void> {
  const migrator = Container.get(MigrateService)
  await migrator.migrate()
}

init()