import { IsNotEmpty, IsString } from 'class-validator'

export class RegisterBodyDto {
  @IsNotEmpty()
  @IsString()
  userName: string

  @IsNotEmpty()
  @IsString()
  password: string
}
