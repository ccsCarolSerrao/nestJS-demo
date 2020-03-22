import { Response } from 'express'

import { IMessage } from './messages.util'

export default class ResponseUtil {
    public static handle(res: Response, message: IMessage): Response {
        return res
            .status(message.status)
            .json(message)
            .send()
    }
}
