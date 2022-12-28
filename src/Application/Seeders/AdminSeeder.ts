import { Container } from "typedi"
import { Seeder } from "@/Vendor/Entities/Seeder"
import { RoleService } from "@/Domain/Role"
import { Password } from "@/Vendor/Helpers"

export const AdminSeeder: Seeder = async (client) => {
  const roleService = Container.get(RoleService)
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
