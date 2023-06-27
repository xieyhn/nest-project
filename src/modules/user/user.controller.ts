import { Controller, Inject, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthorizationGuard } from 'src/guards/authorization.guard'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'

@Controller('user')
@ApiTags('user')
export class UserController {
  @Inject(UserService)
  private userService: UserService

  @Inject(WINSTON_MODULE_PROVIDER)
  private logger: Logger

  @Post('getUserInfo')
  @UseGuards(AuthorizationGuard)
  @ApiOperation({ summary: 'Get user info' })
  getUserInfo(@Req() request: Request) {
    this.logger.info('deg getUserInfo log test %s %s', { a: 'b' }, { c: 'd' })
    this.logger.error('Unexpected error: %', new Error('Test error'))
    return this.userService.getUserInfo(request.user!.id)
  }
}
