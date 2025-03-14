import type { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { BadRequest } from '../helpers/http-helper'
import type { Controller } from '../protocols/controller'
import type { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../errors/invalid-param-error'

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body) {
      return BadRequest(new Error('Invalid request'))
    }

    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return BadRequest(new MissingParamError(field))
      }
    }

    const isEmailValid = this.emailValidator.isValid()

    if (!isEmailValid) {
      return BadRequest(new InvalidParamError('email'))
    }
    return { statusCode: 500, body: new Error('Internal server error') }
  }
}
