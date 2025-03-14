import { MissingParamError } from '../errors/missing-param-error'
import { SignUpController } from './signup'

const makeSut = (): SignUpController => {
  return new SignUpController()
}

describe('SignUp Controller', () => {
  it('Should return 400 if no name is provided', () => {
    const sut = makeSut()

    const httpResponse = sut.handle({
      body: {
        email: 'johndoe@email.com',
        password: 'securePass123',
        passwordConfirmation: 'securePass123',
      },
    })

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  it('Should return 400 if no email is provided', () => {
    const sut = makeSut()

    const httpRequest = {
      body: {
        name: 'John Doe',
        password: 'securePass123',
        passwordConfirmation: 'securePass123',
      },
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  it('Should return 400 if no password is provided', () => {
    const sut = makeSut()

    const httpRequest = {
      body: {
        name: 'John Doe',
        email: 'johndoe@email.com',
        passwordConfirmation: 'securePass123',
      },
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  it('Should return 400 if no passwordConfirmation is provided', () => {
    const sut = makeSut()

    const httpRequest = {
      body: {
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: 'securePass123',
      },
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation'),
    )
  })

  it('Should return 400 if body is missing', () => {
    const sut = makeSut()

    const httpResponse = sut.handle({})

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Invalid request'))
  })
})
