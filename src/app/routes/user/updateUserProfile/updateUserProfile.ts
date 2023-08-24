import { db } from "@/core/database"
import { AuthException } from "@/core/exceptions"
import { validateToken } from "@/core/server/middleware"
import { RouteOptions } from "fastify"
import { bodySchema, Body } from "./updateUserProfile.schema"
import { requestMeta } from "@/core/helpers"

export const updateUserProfile: RouteOptions = {
  url: "/user/profile",
  method: "PUT",
  preValidation: [validateToken],
  schema: {
    body: bodySchema,
  },
  handler: async (req) => {
    const body = req.body as Body
    const { userId } = requestMeta(req)

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw AuthException("cannot update user profile", {
        userId,
        message: "non-existent user in json token",
      })
    }

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: body.name,
        phone: body.phone,
        mobile: body.mobile,
      },
    })

    return {
      message: "user profile updated successfully",
      profile: updatedUser,
    }
  },
}
