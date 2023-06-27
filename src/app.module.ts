import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { CacheModule } from '@nestjs/cache-manager'
import { WinstonModule } from 'nest-winston'
import { ConfigModule } from '@nestjs/config'
import { loadApplicationConfig } from 'src/common/application.config'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { DatabaseConfigService } from './common/database.config.service'
import { JwtConfigService } from './common/jwt.config.service'
import { WinstonConfigService } from './common/winston.config.service'

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
  ],
})
export class AppModule {}
