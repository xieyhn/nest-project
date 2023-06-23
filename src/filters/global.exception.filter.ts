import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { CommonException } from 'src/exception/common.exception'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let HttpStatusCode: number = HttpStatus.INTERNAL_SERVER_ERROR
    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR
    let message = ''

    if (exception instanceof CommonException) {
      HttpStatusCode = 200
      statusCode = exception.getCode()
      message = exception.getMessage()
    }

    response
      .status(HttpStatusCode)
      .json({
        statusCode,
        message,
      })
  }
}
