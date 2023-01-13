import { PrismaClient } from "@prisma/client"
export const database = new PrismaClient()

/**
 *  check if database is successfully connected with the application
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
