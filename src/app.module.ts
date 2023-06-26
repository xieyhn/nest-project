import { format as utilFormat } from 'node:util'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { CacheModule } from '@nestjs/cache-manager'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import { ConfigModule } from '@nestjs/config'
import { loadApplicationConfig } from 'src/common/application.config'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { DatabaseConfigService } from './common/database.config.service'

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
    JwtModule.register({
      global: true,
      secret: 'xieyuhang',
      signOptions: {
        expiresIn: '3d',
      },
    }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        winston.format.printf((info) => {
          const splat = info[Symbol.for('splat')]
          return `[${info.timestamp}][${info.level}]: ${splat ? utilFormat(info.message, ...splat) : info.message}`
        }),
      ),
      transports: [
        new winston.transports.Console(),
        // TODO:区分环境
        // new DailyRotateFile({
        //   filename: 'logs/app.%DATE%.log',
        //   datePattern: 'YYYY-MM-DD',
        //   maxSize: '50m',
        //   maxFiles: '15d',
        // }),
      ],
    },
    ),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
