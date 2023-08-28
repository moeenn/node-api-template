import { RouteOptions } from "fastify"
import { validateToken, hasRole } from "@/core/server/middleware"
import { UserRole } from "@prisma/client"
import { db } from "@/core/database"
import { querySchema, Query } from "./listUsers.schema"
import { appConfig } from "@/app/config/appConfig"

export const listUsers: RouteOptions = {
  url: "/users",
  method: "GET",
  preValidation: [validateToken, hasRole(UserRole.ADMIN)],
  schema: {
    querystring: querySchema,
  },
  handler: async (req) => {
    const query = req.query as Query
    const page = query.page ?? 1

    const findCondition = {
      where: {
        email: query.query ? { startsWith: query.query } : undefined,
      },
    }

    const [count, users] = await db.$transaction([
      db.user.count(findCondition),
      db.user.findMany({
        ...findCondition,
        skip: appConfig.pagination.perPage * (page - 1),
        take: appConfig.pagination.perPage,
      }),
    ])

    return {
      pages: Math.ceil(count / appConfig.pagination.perPage),
      users,
    }
  },
}
