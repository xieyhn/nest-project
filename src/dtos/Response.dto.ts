import { ApiHideProperty } from '@nestjs/swagger'

export class ResponseDto<T> {
  code: number

  message?: string

  @ApiHideProperty()
  result: T
}
