import { Seeder } from "@/vendor/entities/seeder"
import { roleService } from "@/domain/role"
import { Password } from "@/vendor/helpers"

export const adminSeeder: Seeder = async (client) => {
  const adminRole = await roleService.getRoleBySlug("admin")

  const admin = {
    name: "Admin",
    email: "admin@site.com",
    password: await Password.hash("123_Orangez"),
  }

  const user = await client.user.create({
    data: admin,
  })

  await client.userRole.create({
    data: {
      user_id: user.id,
      role_id: adminRole.id,
    },
  })
}
