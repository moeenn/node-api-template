import { Container } from "typedi"
import { Seeder } from "@/Vendor/Entities/Seeder"
import { RoleService } from "@/Domain/Role"
import { Password } from "@/Vendor/Helpers"

export const UsersSeeder: Seeder = async (client) => {
  const roleService = Container.get(RoleService)
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
