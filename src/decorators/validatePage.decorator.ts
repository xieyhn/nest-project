import { applyDecorators } from '@nestjs/common'
import { Type } from 'class-transformer'
import { IsObject, ValidateNested } from 'class-validator'
import { PageRequestDto } from 'src/dtos/page.dto'

export function ValidatePage() {
  return applyDecorators(IsObject(), ValidateNested(), Type(() => PageRequestDto))
}
