import { PrismaClient } from "@prisma/client"
import { seeders } from "./DefaultSeeders"

async function seed() {
  const client = new PrismaClient()

  try {
    for (const seeder of seeders) {
      await seeder(client)
    }
  } catch (err) {
    console.error(err)
  } finally {
    await client.$disconnect()
  }
}

seed()
