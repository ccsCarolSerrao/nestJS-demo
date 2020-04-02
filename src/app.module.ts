import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'

import LoggerMiddleware from './middlewares/logger.middleware'
import ExampleApiModule from './example-api/v1/example-api.module'
import { AuthModule } from './auth/auth.module'

@Module({
    imports: [
        ExampleApiModule,
        AuthModule,
    ],
    providers: [
        LoggerMiddleware,
    ],
})
export default class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('v1/example-api')
    }
}
