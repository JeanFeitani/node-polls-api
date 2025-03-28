import type { FastifyReply, FastifyRequest, RequestPayload } from 'fastify'

export const contentTypeMiddleware = async (
  _: FastifyRequest,
  reply: FastifyReply,
  payload: RequestPayload,
) => {
  reply.header('Content-Type', 'application/json')
  return typeof payload === 'string' ? payload : JSON.stringify(payload)
}
