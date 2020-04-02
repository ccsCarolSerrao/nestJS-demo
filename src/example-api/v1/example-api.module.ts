import { Module } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config'
import keycloakConfig from '../../configs/keycloak.config'

import { AuthModule } from '../../auth/auth.module'
import AllExceptionsFilter from '../../filters/all-exception.filter'
import { ValidationPipe } from '../../pipes/validation.pipe'
import { JwtAuthGuard } from '../../guards/jwt-auth.guard'
import { RolesGuard } from '../../guards/role.guard'

import ExampleApiController from './example-api.controller'
import ExampleApiService from './example-api.service'
import { LoggingInterceptor } from '../../interceptors/logging.interceptor'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env.local',
            load: [keycloakConfig],
        }),
        AuthModule,
        JwtAuthGuard,
        RolesGuard,
        AllExceptionsFilter,
        ValidationPipe,
        LoggingInterceptor,
    ],
    controllers: [ExampleApiController],
    providers: [ExampleApiService],
})
export default class ExampleApiModule {}
