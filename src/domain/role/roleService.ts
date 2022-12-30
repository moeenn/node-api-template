import { Role } from "."
import { database } from "@/vendor/entities/database"
import { NotFoundException } from "@/vendor/exceptions"

/**
 *  get details of a role using its slug
 *
 */
async function getRoleBySlug(slug: string): Promise<Role> {
  const role = await database.role.findFirst({
    where: { slug },
  })

  if (!role) {
    throw NotFoundException("user role not found", {
      role: slug,
    })
  }

  return role
}

/**
 *  resolve multiple slugs into role instances
 *
 */
async function getRolesBySlugs(slugs: string[]): Promise<Role[]> {
  const roles: Role[] = []

  for (const slug of slugs) {
    const role = await getRoleBySlug(slug)
    roles.push(role)
  }

  return roles
}

export const roleService = {
  getRoleBySlug,
  getRolesBySlugs,
}
