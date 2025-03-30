import type { Controller, HttpRequest } from '@/presentation/protocols'
import type { FastifyReply, FastifyRequest } from 'fastify'

export function fastifyAdpter(controller: Controller) {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const httpRequest: HttpRequest = {
      body: req.body,
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).send(httpResponse.body)
  }
}
