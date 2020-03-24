import { Module } from '@nestjs/common'

import { RolesGuard } from 'guards/role.guard'

import ExampleApiController from './example-api.controller'
import ExampleApiService from './example-api.service'
import { JwtAuthGuard } from 'guards/jwt-auth.guard'

@Module({
    controllers: [ExampleApiController],
    providers: [JwtAuthGuard, RolesGuard, ExampleApiService],
})
export default class ExampleApiModule {}
