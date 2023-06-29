import { ApiProperty } from '@nestjs/swagger'

export class FilesUploadBodyDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[]
}
