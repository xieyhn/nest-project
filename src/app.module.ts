import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { UserEntity } from './modules/user/entities/user.entity'
import { RoleEntity } from './modules/user/entities/Role.entity'
import { PermissionEntity } from './modules/user/entities/Permission.entity'
import { AuthenticationGuard } from './guards/authentication.guard'

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
  providers: [
    { provide: APP_GUARD, useClass: AuthenticationGuard },
  ],
})
export class AppModule {}
