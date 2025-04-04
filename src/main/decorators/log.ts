import type { LogErrorRepository } from '@/data/protocols/log-error-repository'
import type {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logErrorRepository?: LogErrorRepository,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      if (!this.logErrorRepository) return httpResponse

      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
