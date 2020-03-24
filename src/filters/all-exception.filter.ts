import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import MessageUtil, { IMessage } from 'utils/messages.util'

@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        //const request = ctx.getRequest()

        let message: IMessage | undefined

        if (exception instanceof Error) {
            message = exception instanceof Error ? MessageUtil.commons.error.serverError : MessageUtil.commons.error.sintaxeError
            message.result = {
                message: exception.message,
                stack: exception.stack,
            }
        }

        if (message === undefined) {
            message = exception as IMessage
        }

        response.status(message.status).json(message)
    }
}

/*
    {
    statusCode: status,
    timestamp: new Date().toISOString(),
    path: request.url,
    message: exception instanceof HttpException ? exception.message : '',
    stack: exception instanceof HttpException ? exception.stack : '',
}
*/
