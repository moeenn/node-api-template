import { Seeder } from "@/Vendor/Entities/Seeder"

export const RolesSeeder: Seeder = async (client) => {
  const roles = [
    { slug: "admin", name: "Admin" },
    { slug: "user", name: "User" },
  ]

  for (const role of roles) {
    await client.role.create({
      data: role,
    })
  }
}
