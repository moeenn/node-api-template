import { Seeder } from "@/vendor/entities/seeder"
import { roleService } from "@/domain/role"
import { Password } from "@/vendor/helpers"

export const usersSeeder: Seeder = async (client) => {
  const userRole = await roleService.getRoleBySlug("user")

  const users = [
    {
      name: "User",
      email: "user@site.com",
      password: await Password.hash("123_Orangez"),
    },
  ]

  for (const user of users) {
    const userRecord = await client.user.create({
      data: user,
    })

    await client.userRole.create({
      data: {
        user_id: userRecord.id,
        role_id: userRole.id,
      },
    })
  }
}
