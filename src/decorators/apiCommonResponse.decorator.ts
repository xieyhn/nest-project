import { Type, applyDecorators } from '@nestjs/common'
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger'
import { ResultDto } from 'src/dtos/result.dto'

export function ApiCommonResponse<TDto extends Type<any>>(dto: TDto) {
  return applyDecorators(
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
