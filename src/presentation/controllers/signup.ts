import type { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { BadRequest, InternalServerError } from '../helpers/http-helper'
import type { Controller } from '../protocols/controller'
import type { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../errors/invalid-param-error'

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      if (!httpRequest.body) {
        return BadRequest(new Error('Invalid request'))
      }

      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return BadRequest(new MissingParamError(field))
        }
      }

      const isEmailValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isEmailValid) {
        return BadRequest(new InvalidParamError('email'))
      }
    } catch {
      return InternalServerError()
    }
    return { statusCode: 200, body: {} }
  }
}
