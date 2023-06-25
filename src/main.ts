import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { GlobalExceptionFilter } from './filters/global.exception.filter'
import { TransformInterceptor } from './interceptors/transform.interceptor'
import { AuthenticationGuard } from './guards/authentication.guard'
import { AuthorizationGuard } from './guards/authorization.guard'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useGlobalGuards(new AuthenticationGuard(), new AuthorizationGuard())

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }))

  app.useGlobalFilters(new GlobalExceptionFilter())

  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(3000)
}

bootstrap()
