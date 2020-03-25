import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core'

import AllExceptionsFilter from './filters/all-exception.filter'
import { ValidationPipe } from './pipes/validation.pipe'
import keycloakConfig from './configs/keycloak.config'

import LoggerMiddleware from './middlewares/logger.middleware'
import ExampleApiModule from './example-api/v1/example-api.module'
import { AuthModule } from './auth/auth.module'
import { LoggingInterceptor } from './interceptors/logging.interceptor'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env.local',
            load: [keycloakConfig],
        }),
        ExampleApiModule,
        AuthModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
        LoggerMiddleware,
    ],
})
export default class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('v1/example-api')
    }
}
