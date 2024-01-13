import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { instanceToPlain } from 'class-transformer'
import type { Observable } from 'rxjs'
import { map } from 'rxjs'

export interface Response<T> {
  code: number
  data: T
}

export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(_: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next
      .handle()
      .pipe(
        map(data => ({
          code: 0,
          data: instanceToPlain(data) as T,
        })),
      )
  }
}
