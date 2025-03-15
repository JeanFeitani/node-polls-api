import { ServerError } from '../errors'
import type { HttpResponse } from '../protocols/http'

export function BadRequest(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: error,
  }
}

export function InternalServerError(): HttpResponse {
  return {
    statusCode: 500,
    body: new ServerError(),
  }
}
