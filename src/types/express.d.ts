declare namespace Express {
  interface Request {
    requestID: string
    user?: {
      id: number
      userName: string
    }
  }
}