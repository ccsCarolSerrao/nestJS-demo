import { NextFunction } from "express"

export const nextFunctionMock = () => {
    return jest.fn() as NextFunction
}