import { IsNotEmpty, IsString } from 'class-validator'

export class LoginBodyDto {
  @IsNotEmpty()
  @IsString()
  userName: string

  @IsNotEmpty()
  @IsString()
  password: string
}
