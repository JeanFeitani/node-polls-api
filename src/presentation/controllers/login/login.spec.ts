import { LoginController } from './login'
import { badRequest } from '@/presentation/helpers/http-helper'
import { MissingParamError } from '@/presentation/errors'

describe('Test', () => {
  it('Should return 400 if no email is not provided', async () => {
    const sut = new LoginController()

    const account = {}

    const httpResponse = await sut.handle(account)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  it('Should return 400 if no password is not provided', async () => {
    const sut = new LoginController()

    const account = { body: { email: 'any_email' } }

    const httpResponse = await sut.handle(account)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
