import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import type {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
} from '../protocols'

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      if (!httpRequest.body) {
        return badRequest(new Error('Invalid request'))
      }

      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation)
        badRequest(new InvalidParamError('passwordConfirmation'))

      const isEmailValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch {
      return serverError()
    }
    return { statusCode: 200, body: {} }
  }
}
