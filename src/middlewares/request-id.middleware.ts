import { NestMiddleware } from '@nestjs/common'
import { v4 as uuidV4 } from 'uuid'
import { Request, Response } from 'express'

export class RequestIDMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const requestID = uuidV4()
    req.requestID = requestID
    res.setHeader('X-Request-ID', requestID)

    next()
  }
}
