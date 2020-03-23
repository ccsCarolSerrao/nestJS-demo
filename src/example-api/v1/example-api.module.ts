import { Module } from '@nestjs/common'
import ExampleApiController from './example-api.controller'
import ExampleApiService from './example-api.service'
import { RolesGuard } from 'guards/role.guard'
import { AuthGuard } from 'guards/auth.guard'

@Module({
    controllers: [ExampleApiController],
    providers: [AuthGuard, RolesGuard, ExampleApiService],
})
export default class ExampleApiModule {}
