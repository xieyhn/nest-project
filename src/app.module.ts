import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { CacheModule } from '@nestjs/cache-manager'
import { WinstonModule } from 'nest-winston'
import { ConfigModule } from '@nestjs/config'
import { loadApplicationConfig } from 'src/common/application.config'
import { UserModule } from 'src/modules/user/user.module'
import { AuthModule } from 'src/modules/auth/auth.module'
import { DatabaseConfigService } from 'src/common/database.config.service'
import { JwtConfigService } from 'src/common/jwt.config.service'
import { WinstonConfigService } from 'src/common/winston.config.service'
import { RequestIDMiddleware } from './middlewares/request-id.middleware'
import { UtilModule } from './modules/util/util.module'
import { UserService } from './modules/user/user.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [loadApplicationConfig],
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
  providers: [
    UserService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIDMiddleware).forRoutes('*')
  }
}
