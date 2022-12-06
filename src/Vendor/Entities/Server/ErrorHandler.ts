import { FastifyError, FastifyRequest, FastifyReply } from "fastify"

/**
 *  custom global error handler for fastify. this is required because by
 *  default fastify doesn't serialize error messages properly
 *
 */
export async function ErrorHandler(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  reply.status(error.statusCode ?? 500)
  return {
    code: error.code,
    error: JSON.parse(error.message),
  }
}
