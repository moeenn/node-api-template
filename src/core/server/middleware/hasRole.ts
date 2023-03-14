import { Request, Reply, Done } from "@/core/server"
import { AuthException } from "@/core/exceptions"
import { UserRole } from "@prisma/client"

export const hasRole = (...roles: UserRole[]) => {
  return (req: Request, _reply: Reply, done: Done) => {
    const currentRole = req.requestContext.get("userRole")

    /**
     * at least one of the provided roles must be present in the
     * current user's roles
     */
    if (!roles.includes(currentRole)) {
      throw AuthException(
        `only authorized roles can access this resource. authorized roles: ${roles}`,
      )
    }

    done()
  }
}
