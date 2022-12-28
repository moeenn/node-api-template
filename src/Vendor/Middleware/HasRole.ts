import { Request, Reply, Done } from "@/Vendor/Entities/Server"
import { AuthException } from "@/Vendor/Exceptions"

export const HasRole = (...roles: string[]) => {
  return async (req: Request, _reply: Reply, done: Done) => {
    const currentRoles = req.requestContext.get("user_roles")

    /**
     *  at least one of the provided roles must be present in the
     *  current user's roles
     */
    if (!isPresent(roles, currentRoles)) {
      throw AuthException("only authorized roles can access this resource", {
        authorized_roles: roles,
      })
    }

    done()
  }
}

function isPresent(all: string[], current: string[]): boolean {
  for (const role of current) {
    if (all.includes(role)) {
      return true
    }
  }

  return false
}
