import { ServerError } from '../errors'
import type { HttpResponse } from '../protocols/http'

export function badRequest(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: error,
  }
}

export function serverError(error: Error): HttpResponse {
  return {
    statusCode: 500,
    body: new ServerError(error.stack),
  }
}

export function ok(data: any): HttpResponse {
  return {
    statusCode: 200,
    body: data,
  }
}
