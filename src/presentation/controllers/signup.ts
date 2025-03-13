import type { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { BadRequest } from '../helpers/http-helper'

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      BadRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.name) {
      BadRequest(new MissingParamError('email'))
    }
    return { statusCode: 500, body: new Error('Internal server error') }
  }
}
