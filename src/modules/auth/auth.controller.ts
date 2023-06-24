import { Body, Controller, Post } from '@nestjs/common'
import { LoginDto } from './dto/Login.dto'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/Register.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.userLogin(loginDto)
  }
}
