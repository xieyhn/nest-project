import { format as utilFormat } from 'node:util'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { CacheModule } from '@nestjs/cache-manager'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { UserEntity } from './modules/user/entities/User.entity'
import { RoleEntity } from './modules/user/entities/Role.entity'
import { PermissionEntity } from './modules/user/entities/Permission.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'xyh@26...',
      database: 'nest',
      synchronize: true,
      logging: true,
      entities: [
        UserEntity,
        RoleEntity,
        PermissionEntity,
      ],
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
