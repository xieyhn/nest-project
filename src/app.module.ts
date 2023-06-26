import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { CacheModule } from '@nestjs/cache-manager'
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
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
