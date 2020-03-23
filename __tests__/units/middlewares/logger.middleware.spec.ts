import { Test, TestingModule } from '@nestjs/testing'
import LoggerMiddleware from '../../../src/middlewares/logger.middleware'

describe('LoggerMiddleware', () => {
    let provider: LoggerMiddleware

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LoggerMiddleware],
        }).compile()

        provider = module.get<LoggerMiddleware>(LoggerMiddleware)
    })

    it('should be defined', () => {
        expect(provider).toBeDefined()
    })
})
