import { database } from "@/vendor/entities/database"
import { defaultSeeders } from "@/app/seeders/defaultSeeders"

export async function seedRunner() {
  try {
    for (const seeder of defaultSeeders) {
      /**
       *  stop seeding at the first error
       */
      await seeder(database)
    }
  } finally {
    await database.$disconnect()
  }
}
