import { PrismaClient } from "@prisma/client"
import { db } from "./index"

/**
 * check if database is successfully connected with the application
 *
 */
export async function ping(client: PrismaClient): Promise<boolean> {
  try {
    await client.$queryRawUnsafe("SELECT 1")
  } catch (_) {
    return false
  }
  return true
}

/**
 * remove all data from all database tables, useful when writing database tests
 *
 */
export async function clearDatabase() {
  const tablenames = await db.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== "_prisma_migrations")
    .map((name) => `"public"."${name}"`)
    .join(", ")

  try {
    await db.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`)
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.log({ error })
  }
}
