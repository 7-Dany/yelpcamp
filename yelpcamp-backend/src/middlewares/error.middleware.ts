import { Request, Response, NextFunction } from 'express'

interface StatusError extends Error {
  status?: number
}

export const errorMiddleware = (
  error: StatusError,
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const status = error.status || 500
  const message = error.message || 'Something went wrong'
  response.status(status).json({
    status: 'failed',
    message
  })
}
