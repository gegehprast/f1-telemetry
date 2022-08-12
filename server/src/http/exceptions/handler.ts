import { Response } from 'express'
import HttpException from './HttpException'

export const exceptionHandler = (exception: unknown, res: Response) => {
    let code = 500
    let message
    let stack

    if (typeof exception === 'string') {
        message = exception.toUpperCase()
    } else if (exception instanceof Error) {
        if (exception instanceof HttpException) {
            code = exception.code
        }
        
        message = message || exception.message
        stack = exception.stack
    }

    if (process.env.APP_DEBUG) {
        return res.status(code).json({ message, stack })
    }

    return res.status(code).json({ message })
}
