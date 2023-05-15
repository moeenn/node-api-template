import { PrismaClient } from "@prisma/client"

/**
 * generally we would have exported prisma client as follows
 * export const database =  new PrismaClient()
 *
 * this works in production, but during testing it leads to multiple
 * prisma client instantiations, using up excessive memory and slowing down
 * the tests.
 *
 * the following code only allows one instance of the prisma client to be
 * instantiated
 */
declare global {
  /* eslint-disable-next-line no-var */
  var databaseInstance: PrismaClient
}

let db: PrismaClient
if (process.env.NODE_ENV === "production") {
  db = new PrismaClient()
} else {
  if (!global.databaseInstance) {
    global.databaseInstance = new PrismaClient()
  }
  db = global.databaseInstance
}
export { db }

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
