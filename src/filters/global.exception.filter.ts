import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { CommonException } from '../exception/common.exception'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let HttpStatusCode: number = HttpStatus.INTERNAL_SERVER_ERROR
    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR
    let message = ''

    if (exception instanceof HttpException) {
      HttpStatusCode = HttpStatus.OK
      statusCode = exception.getStatus()

      // parameter error
      if (statusCode === HttpStatus.BAD_REQUEST) {
        message = (exception.getResponse() as any).message.join(',')
      }
      else if (statusCode === HttpStatus.NOT_FOUND) {
        HttpStatusCode = HttpStatus.NOT_FOUND
        statusCode = HttpStatus.NOT_FOUND
        message = exception.message
      }
    }
    else if (exception instanceof CommonException) {
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
