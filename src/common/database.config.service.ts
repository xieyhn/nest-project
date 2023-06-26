import { resolve } from 'node:path'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private configService: ConfigService

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      charset: 'utf8mb4',
      host: this.configService.get('db.mysql.host'),
      port: this.configService.get('db.mysql.port'),
      username: this.configService.get('db.mysql.username'),
      password: this.configService.get('db.mysql.password'),
      database: this.configService.get('db.mysql.database'),
      synchronize: true,
      entities: [
        resolve(__dirname, '../modules/**/entities/*.entity{.ts,.js}'),
      ],
    }
  }
}
