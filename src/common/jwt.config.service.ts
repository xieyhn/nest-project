import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt'

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  @Inject(ConfigService)
  private configService: ConfigService

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get('jwt.secret'),
      signOptions: this.configService.get('jwt.signOptions'),
    }
  }
}
