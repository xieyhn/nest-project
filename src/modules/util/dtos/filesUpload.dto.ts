import { ApiProperty } from '@nestjs/swagger'

export class FilesUpdateRequestDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[]
}

export class FilesUpdateResponseDto {
  @ApiProperty({ type: 'array', items: { type: 'string' } })
  files: string[]
}
