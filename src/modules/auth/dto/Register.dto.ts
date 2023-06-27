import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User name',
  })
  userName: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User password',
  })
  password: string
}
