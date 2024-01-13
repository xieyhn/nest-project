import type { Type } from '@nestjs/common'
import { applyDecorators } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'
import { ResponseDto } from 'src/dtos/Response.dto'

export function ApiSuccessResponse<TDto extends Type<any>>(dto?: TDto) {
  return applyDecorators(
    ...[
      dto ? ApiExtraModels(dto) : undefined,
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseDto) },
            {
              properties: {
                result: dto
                  ? {
                      $ref: getSchemaPath(dto),
                    }
                  : null,
              },
            },
          ],
        },
      }),
    ].filter(Boolean),
  )
}
