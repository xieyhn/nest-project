import { Controller, Inject, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthorizationGuard } from 'src/guards/authorization.guard'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'

@Controller('user')
@ApiTags('user')
export class UserController {
  @Inject(UserService)
  private userService: UserService

  @Post('getUserInfo')
  @UseGuards(AuthorizationGuard)
  @ApiOperation({ summary: 'Get user info' })
  getUserInfo(@Req() request: Request) {
    return this.userService.getUserInfo(request.user!.id)
  }
}
