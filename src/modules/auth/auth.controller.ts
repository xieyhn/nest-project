import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiSuccessResponse } from 'src/decorators/ApiSuccessResponse.decorator'
import { LoginBodyDto } from './dtos/LoginBody.dto'
import { AuthService } from './auth.service'
import { RegisterBodyDto } from './dtos/RegisterBody.dto'
import { LoginResultDto } from './dtos/LoginResult.dto'

@Controller('/auth')
@ApiTags('auth')
export class AuthController {
  @Inject(AuthService)
  private authService: AuthService

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  @ApiSuccessResponse()
  register(@Body() bodyDto: RegisterBodyDto) {
    return this.authService.register(bodyDto)
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiSuccessResponse(LoginResultDto)
  login(@Body() bodyDto: LoginBodyDto): Promise<LoginResultDto> {
    return this.authService.userLogin(bodyDto)
  }
}
