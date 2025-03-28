import type { FastifyReply, FastifyRequest } from 'fastify'

export const cors = (
  req: FastifyRequest,
  res: FastifyReply,
  next: () => void,
) => {
  res.header('access-control-allow-origin', '*')
  res.header('access-control-allow-headers', '*')
  res.header('access-control-allow-methods', '*')

  console.log(`Interceptando: ${req.method} ${req.url}`)

  next()
}
