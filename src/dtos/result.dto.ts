import { ApiHideProperty } from '@nestjs/swagger'

export class ResultDto<T> {
  statusCode: number

  message?: string

  @ApiHideProperty()
  result: T
}
