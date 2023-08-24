import { RouteOptions } from "fastify"
import { validateToken, hasRole } from "@/core/server/middleware"
import { UserRole } from "@prisma/client"
import { db } from "@/core/database"
import { BadRequestException } from "@/core/exceptions"
import { bodySchema, Body } from "./setUserStatus.schema"

export const setUserStatus: RouteOptions = {
  url: "/user/set-status",
  method: "POST",
  preValidation: [validateToken, hasRole(UserRole.ADMIN)],
  schema: {
    body: bodySchema,
  },
  handler: async (req) => {
    const body = req.body as Body

    const user = await db.user.findFirst({
      where: {
        id: body.userId,
      },
    })

    if (!user) {
      throw BadRequestException("invalid user id", {
        userId: body.userId,
        message: "request to set account status for non-existent user",
      })
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        approved: body.status,
      },
    })

    return {
      message: "user account status updated successfully",
      updatedStatus: body.status,
    }
  },
}
