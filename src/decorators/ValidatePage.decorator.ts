import { applyDecorators } from '@nestjs/common'
import { Type } from 'class-transformer'
import { IsObject, ValidateNested } from 'class-validator'
import { PageBodyDto } from 'src/dtos/PageBody.dto'

export function ValidatePage() {
  return applyDecorators(IsObject(), ValidateNested(), Type(() => PageBodyDto))
}
