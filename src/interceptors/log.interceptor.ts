import { CallHandler, ExecutionContext, LoggerService, NestInterceptor } from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { Request } from 'express'

export class LogInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>()
    const { requestID, user, method, url, body } = request
    const start = Date.now()
    this.logger.log(`[request](${requestID}) ${method} ${url} userID:${user?.id} body:${JSON.stringify(body)}`)

    return next
      .handle()
      .pipe(
        tap((data) => {
          this.logger.log(`[response ${Date.now() - start}ms](${requestID}) ${method} ${url} result:${JSON.stringify(data)}`)
        }),
      )
  }
}
