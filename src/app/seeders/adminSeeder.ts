import { Seeder } from "@/core/database/seeder"
import { UserRole } from "@prisma/client"
import { Password } from "@/core/helpers"

export const adminSeeder: Seeder = async (client) => {
  await client.user.create({
    data: {
      name: "Admin",
      email: "admin@site.com",
      role: UserRole.ADMIN,
      password: {
        create: {
          hash: await Password.hash("123_Orangez"),
        },
      },
    },
  })
}
