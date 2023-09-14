import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from "fastify"
import { AuthException } from "@/core/entities/exceptions"
import { UserRole } from "@prisma/client"
import { requestMeta } from "@/core/helpers"

export const hasRole = (...roles: UserRole[]) => {
  return (
    req: FastifyRequest,
    _reply: FastifyReply,
    done: DoneFuncWithErrOrRes,
  ) => {
    const { userRole } = requestMeta(req)

    /**
     * at least one of the provided roles must be present in the
     * current user's roles
     */
    if (!roles.includes(userRole)) {
      throw AuthException(
        `only authorized roles can access this resource. authorized roles: ${roles}`,
      )
    }

    done()
  }
}
