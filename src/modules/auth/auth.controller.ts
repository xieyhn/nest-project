import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { LoginDto } from './dto/Login.dto'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/Register.dto'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @Inject(AuthService)
  private authService: AuthService

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.userLogin(loginDto)
  }
}
