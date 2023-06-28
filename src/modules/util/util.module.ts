import { Module } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { UtilController } from './util.controller'
import { UtilService } from './util.service'

@Module({
  controllers: [UtilController],
  providers: [UtilService, UserService],
})
export class UtilModule {}
