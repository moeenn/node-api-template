import { Container } from "typedi"
import { PrismaClient } from "@prisma/client"
import { RoleService } from "@/Domain/Role"
// import { Password } from "@/Vendor/Helpers"
import argon2 from "argon2"

export async function AdminSeeder(client: PrismaClient) {
  const roleService = Container.get(RoleService)
  const adminRole = await roleService.getRoleBySlug("admin")

  const admin = {
    name: "Admin",
    email: "admin@site.com",
    password: await argon2.hash("password"),
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
