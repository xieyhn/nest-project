import type { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { CacheModule } from '@nestjs/cache-manager'
import { WinstonModule } from 'nest-winston'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from 'src/modules/user/user.module'
import { AuthModule } from 'src/modules/auth/auth.module'
import { DatabaseConfigService } from 'src/services/Database.service'
import { JwtConfigService } from 'src/services/Jwt.service'
import { WinstonConfigService } from 'src/services/Winston.service'
import { RequestIDMiddleware } from './middlewares/RequestID.middleware'
import { UtilModule } from './modules/util/util.module'
import { configuration } from './common/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      global: true,
      useClass: JwtConfigService,
    }),
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
    UserModule,
    AuthModule,
    UtilModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIDMiddleware).forRoutes('*')
  }
}
