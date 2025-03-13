import { MissingParamError } from '../errors/missing-param-error'
import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  it('Should return 400 if no name is provided', () => {
    const sut = new SignUpController()

    const httpResponse = sut.handle({
      body: {
        email: 'johndoe@email.com',
        password: 'pass',
      },
    })

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
  it('Should return 400 if no email is provided', () => {
    const sut = new SignUpController()

    const httpResponse = sut.handle({
      body: {
        name: 'john doe',
        password: 'pass',
      },
    })

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})
