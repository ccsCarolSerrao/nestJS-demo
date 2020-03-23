import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'

@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
    use(_req: Request, _res: Response, next: Function) {
        console.log('Request...')
        next()
    }
}
