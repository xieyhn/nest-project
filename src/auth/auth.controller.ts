import { Body, Controller, Post } from '@nestjs/common'
import { LoginDto } from './dto/Login.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.userLogin(loginDto)
  }
}
