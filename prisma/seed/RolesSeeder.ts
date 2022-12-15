import { PrismaClient } from "@prisma/client"

export async function RolesSeeder(client: PrismaClient) {
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