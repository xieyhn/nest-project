import { ApiProperty } from '@nestjs/swagger'

export class FilesUpdateDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[]
}
