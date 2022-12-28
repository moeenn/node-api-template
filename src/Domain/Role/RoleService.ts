import { Service } from "typedi"
import { Role } from "."
import { Database } from "@/Vendor/Entities/Database"
import { NotFoundException } from "@/Vendor/Exceptions"

@Service()
export class RoleService {
  constructor(private db: Database) {}

  /**
   *  get details of a role using its slug
   *
   */
  public async getRoleBySlug(slug: string): Promise<Role> {
    const role = await this.db.conn.role.findFirst({
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
  public async getRolesBySlugs(slugs: string[]): Promise<Role[]> {
    const roles: Role[] = []

    for (const slug of slugs) {
      const role = await this.getRoleBySlug(slug)
      roles.push(role)
    }

    return roles
  }
}
