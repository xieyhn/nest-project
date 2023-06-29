import { ApiHideProperty } from '@nestjs/swagger'

export class ResultDto<T> {
  code: number

  message?: string

  @ApiHideProperty()
  result: T
}
