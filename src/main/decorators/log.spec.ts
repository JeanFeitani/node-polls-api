import type {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols'
import { LogControllerDecorator } from './log'

describe('Log Controller Decorator', () => {
  it('Should call controller handle', async () => {
    class ControllerStub implements Controller {
      handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        return new Promise((resolve, _) =>
          resolve({ body: httpRequest.body, statusCode: 200 }),
        )
      }
    }

    const controllerStub = new ControllerStub()
    const sut = new LogControllerDecorator(controllerStub)

    const controllerSpy = jest.spyOn(controllerStub, 'handle')

    await sut.handle({
      body: {
        value: 'Jean Feitani',
      },
    })

    expect(controllerSpy).toHaveBeenCalledWith({
      body: {
        value: 'Jean Feitani',
      },
    })
  })
})
