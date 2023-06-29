import { Controller, HttpCode, HttpStatus, Inject, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthorizationGuard } from 'src/guards/Authorization.guard'
import { ApiTags } from '@nestjs/swagger'
import { ApiSuccessResponse } from 'src/decorators/ApiSuccessResponse.decorator'
import { UserService } from './user.service'
import { GetUserInfoResultDto } from './dtos/GetUserInfoResult.dto'

@ApiTags('user')
@Controller('/user')
@UseGuards(AuthorizationGuard)
export class UserController {
  @Inject(UserService)
  private userService: UserService

  @Post('/getUserInfo')
  @HttpCode(HttpStatus.OK)
  @ApiSuccessResponse(GetUserInfoResultDto)
  getUserInfo(@Req() request: Request): Promise<GetUserInfoResultDto> {
    return this.userService.getUserInfoBy({ id: request.user!.id })
  }
}
