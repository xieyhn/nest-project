import { Body, Controller, Post } from '@nestjs/common'
import { OptionalAuthentication } from 'src/decorators/OptionalAuthentication'
import { LoginDto } from './dto/Login.dto'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/Register.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/register')
  @OptionalAuthentication()
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Post('/login')
  @OptionalAuthentication()
  login(@Body() loginDto: LoginDto) {
    return this.authService.userLogin(loginDto)
  }
}
