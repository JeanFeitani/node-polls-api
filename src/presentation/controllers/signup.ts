import type { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { BadRequest } from '../helpers/http-helper'

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        BadRequest(new MissingParamError(field))
      }
    }
    return { statusCode: 500, body: new Error('Internal server error') }
  }
}
