import {
  MissingParamError,
  InvalidParamError,
  ServerError,
} from '@/presentation/errors'
import { SignUpController } from './signup'
import type {
  EmailValidator,
  AddAccount,
  AddAccountModel,
  AccountModel,
} from './signup-protocols'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid_password',
      }
      return new Promise((resolve) => resolve(fakeAccount))
    }
  }
  return new AddAccountStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)
  return { sut, emailValidatorStub, addAccountStub }
}

describe('SignUp Controller', () => {
  it('Should return 400 if body is missing', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({})

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Invalid request'))
  })

  it('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({
      body: {
        email: 'johndoe@email.com',
        password: 'securePass123',
        passwordConfirmation: 'securePass123',
      },
    })

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  it('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'John Doe',
        password: 'securePass123',
        passwordConfirmation: 'securePass123',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  it('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'John Doe',
        email: 'johndoe@email.com',
        passwordConfirmation: 'securePass123',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  it('Should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: 'securePass123',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation'),
    )
  })

  it('Should return 400 if no passwordConfirmation fails', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: 'securePass123',
        passwordConfirmation: 'invalid_pass',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      new InvalidParamError('passwordConfirmation'),
    )
  })

  it('Should return 400 if email is not valid', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'John Doe',
        email: 'invalid email',
        password: 'securePass123',
        passwordConfirmation: 'securePass123',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  it('Should call the email validator with the correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: 'securePass123',
        passwordConfirmation: 'securePass123',
      },
    }

    await sut.handle(httpRequest)

    expect(isValidSpy).toHaveBeenCalledWith('johndoe@email.com')
  })

  it('Should return 500 if controller if email validator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      body: {
        name: 'John Doe',
        email: 'invalid email',
        password: 'securePass123',
        passwordConfirmation: 'securePass123',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  it('Should return 500 if controller if add account throws', async () => {
    const { sut, addAccountStub } = makeSut()

    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return new Promise((_, reject) => reject(new Error()))
    })

    const httpRequest = {
      body: {
        name: 'John Doe',
        email: 'invalid email',
        password: 'securePass123',
        passwordConfirmation: 'securePass123',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  it('Should call addAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()

    const addSpy = jest.spyOn(addAccountStub, 'add')

    const httpRequest = {
      body: {
        name: 'John Doe',
        email: 'invalid email',
        password: 'securePass123',
        passwordConfirmation: 'securePass123',
      },
    }

    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'invalid email',
      password: 'securePass123',
    })
  })

  it('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password',
      },
    }

    const httpResponse = await await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password',
    })
  })
})
