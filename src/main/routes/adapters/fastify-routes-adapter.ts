import type { Controller, HttpRequest } from '@/presentation/protocols'
import type { FastifyReply, FastifyRequest } from 'fastify'

export function fastifyAdpter(controller: Controller) {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const httpRequest: HttpRequest = {
      body: req.body,
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).send(httpResponse.body)
    } else {
      res
        .status(httpResponse.statusCode)
        .send({ error: httpResponse.body.message })
    }
  }
}
