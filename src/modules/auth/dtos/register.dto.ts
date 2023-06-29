import { IsNotEmpty, IsString } from 'class-validator'

export class RegisterRequestDto {
  @IsNotEmpty()
  @IsString()
  userName: string

  @IsNotEmpty()
  @IsString()
  password: string
}
