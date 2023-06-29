import { Type, applyDecorators } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'
import { ResultDto } from 'src/dtos/result.dto'

export function ApiSuccessResponse<TDto extends Type<any>>(dto: TDto) {
  return applyDecorators(
    ApiExtraModels(dto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResultDto) },
          {
            properties: {
              result: {
                $ref: getSchemaPath(dto),
              },
            },
          },
        ],
      },
    }),
  )
}
