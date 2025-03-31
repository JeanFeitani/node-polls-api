import type {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols'
import { LogControllerDecorator } from './log'
import { serverError } from '@/presentation/helpers/http-helper'
import type { LogErrorRepository } from '@/data/protocols/log-error-repository'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return new Promise((resolve, _) =>
        resolve({ body: httpRequest.body, statusCode: 200 }),
      )
    }
  }

  const controllerStub = new ControllerStub()

  return controllerStub
}
const makeLogErrorRepositoryStub = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    log(stack: string): Promise<void> {
      return new Promise((resolve, _) => resolve())
    }
  }

  const logErrorRepositoryStub = new LogErrorRepositoryStub()

  return logErrorRepositoryStub
}

const makeSut = () => {
  const controllerStub = makeController()

  const logErrorRepositoryStub = makeLogErrorRepositoryStub()

  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub,
  }
}

describe('Log Controller Decorator', () => {
  it('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()

    const controllerSpy = jest.spyOn(controllerStub, 'handle')

    await sut.handle({
      body: {
        name: 'Jean Feitani',
      },
    })

    expect(controllerSpy).toHaveBeenCalledWith({
      body: {
        name: 'Jean Feitani',
      },
    })
  })
  it.only('Should call LogErrorRepository with correct error if controller returns an error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)

    const logErrorSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    jest
      .spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(new Promise((resolve) => resolve(error)))

    await sut.handle({
      body: {
        name: 'Jean Feitani',
      },
    })

    expect(logErrorSpy).toHaveBeenCalledWith('any_stack')
  })
})
