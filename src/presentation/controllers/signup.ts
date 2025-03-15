import type { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { badRequest, serverError } from '../helpers/http-helper'
import type { Controller } from '../protocols/controller'
import type { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError, MissingParamError } from '../errors'

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
