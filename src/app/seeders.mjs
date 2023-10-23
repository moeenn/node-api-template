// @ts-check
import { PrismaClient, UserRole } from "@prisma/client"
import argon2 from "argon2"

/**
 * create the default admin user account with account password
 * @param {PrismaClient} db
 */
async function adminSeeder(db) {
  await db.user.create({
    data: {
      name: "Admin",
      email: "admin@site.com",
      role: UserRole.ADMIN,
      password: {
        create: {
          hash: await argon2.hash("123_Orangez"),
        },
      },
    },
  })
}

/**
 * the application may require some default data to be present in the database
 * to be opeational. You may define functions here for setting up the default
 * state of the application database.
 *
 * @returns {Promise<void>}
 */
async function runSeeders() {
  const db = new PrismaClient()

  /** @type {((client: PrismaClient) => Promise<void>)[]} */
  const enabledSeeders = [adminSeeder]

  try {
    for (const seeder of enabledSeeders) {
      await seeder(db)
    }
  } finally {
    await db.$disconnect()
  }
}

/* eslint-disable-next-line no-console */
runSeeders().catch(console.error)
