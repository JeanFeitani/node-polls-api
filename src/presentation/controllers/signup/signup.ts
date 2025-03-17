import { MissingParamError, InvalidParamError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helpers/http-helper'
import type {
  Controller,
  EmailValidator,
  AddAccount,
  HttpRequest,
  HttpResponse,
} from './signup-protocols'

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body) {
        return badRequest(new Error('Invalid request'))
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body

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

      if (password !== passwordConfirmation)
        return badRequest(new InvalidParamError('passwordConfirmation'))

      const isEmailValid = this.emailValidator.isValid(email)

      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password,
      })

      return ok(account)
    } catch {
      return serverError()
    }
  }
}
