import { NestMiddleware } from '@nestjs/common'
import { v4 as uuidV4 } from 'uuid'
import { Request, Response } from 'express'

export class RequestIDMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const requestId = uuidV4()
    req.requestID = requestId
    res.setHeader('X-Request-ID', requestId)

    next()
  }
}
