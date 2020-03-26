import { Request } from 'express'

export const requestMock = (body: any) => {
    return { body } as Request
}
