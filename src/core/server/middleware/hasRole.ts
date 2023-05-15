import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from "fastify"
import { AuthException } from "@/core/exceptions"
import { UserRole } from "@prisma/client"

export const hasRole = (...roles: UserRole[]) => {
  return (
    req: FastifyRequest,
    _reply: FastifyReply,
    done: DoneFuncWithErrOrRes,
  ) => {
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
