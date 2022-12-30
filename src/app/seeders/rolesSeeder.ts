import { Seeder } from "@/vendor/entities/seeder"

export const rolesSeeder: Seeder = async (client) => {
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
