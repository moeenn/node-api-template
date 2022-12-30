import { FastifyError, FastifyRequest, FastifyReply } from "fastify"
import { isJSON } from "@/vendor/helpers"

/**
 *  custom global error handler for fastify. this is required because by
 *  default fastify doesn't serialize error messages properly
 *
 */
export async function errorHandler(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const err = isJSON(error.message) ? JSON.parse(error.message) : error.message

  reply.status(error.statusCode ?? 500)
  return {
    code: error.code,
    error: err,
  }
}
