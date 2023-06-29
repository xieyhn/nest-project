import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { LoginRequestDto } from './dtos/login.dto'
import { AuthService } from './auth.service'
import { RegisterRequestDto } from './dtos/register.dto'

@Controller('/auth')
@ApiTags('auth')
export class AuthController {
  @Inject(AuthService)
  private authService: AuthService

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  register(@Body() registerRequestDto: RegisterRequestDto) {
    return this.authService.register(registerRequestDto)
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginRequestDto: LoginRequestDto) {
    return this.authService.userLogin(loginRequestDto)
  }
}
