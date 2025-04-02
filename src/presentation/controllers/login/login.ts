import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http-helper'
import type {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols'

export class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body?.email) {
      return badRequest(new MissingParamError('email'))
    }

    if (!httpRequest.body?.password) {
      return badRequest(new MissingParamError('password'))
    }

    const httpResponse = {
      statusCode: 200,
      body: { email: 'any_email' },
    }

    return badRequest(new MissingParamError('email'))
  }
}
