import { db } from "@/core/database"
import { defaultSeeders } from "@/app/seeders/defaultSeeders"

export async function seedRunner() {
  try {
    for (const seeder of defaultSeeders) {
      /**
       * stop seeding at the first error
       */
      await seeder(db)
    }
  } finally {
    await db.$disconnect()
  }
}
