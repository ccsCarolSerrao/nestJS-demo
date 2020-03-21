import { Request } from 'express'

export const requestMock = (body: Object) => {
    return { body } as Request
}