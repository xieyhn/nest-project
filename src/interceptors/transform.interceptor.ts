import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { instanceToPlain } from 'class-transformer'
import { Observable, map } from 'rxjs'

export interface Response<T> {
  statusCode: number
  data: T
}

export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next
      .handle()
      .pipe(
        map(data => ({
          statusCode: 0,
          data: instanceToPlain(data) as T,
        })),
      )
  }
}
