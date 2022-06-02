import SQL from "@src/Infra/Database/Init"

/**
 *  after a migration has been successfully executed, make an entry in the 
 *  migrations table
*/
export async function MarkMigrationAsExecuted(migration: string): Promise<void> {
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
export async function MigrationsTableExists(): Promise<boolean> {
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
export async function IsMigrationApplied(migration: string): Promise<boolean> {
  const tableExists = await MigrationsTableExists() 
  if (!tableExists) return false

  const [row] = await SQL`
    SELECT COUNT(*) 
    FROM migrations
    WHERE file = ${migration}
  `

  return row.count === "1"
}