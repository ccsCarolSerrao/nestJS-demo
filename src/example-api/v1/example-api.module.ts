import { Module } from '@nestjs/common'
import ExampleApiController from './example-api.controller'
import ExampleApiService from './example-api.service'

@Module({
    controllers: [ExampleApiController],
    providers: [ExampleApiService],
})
export default class ExampleApiModule {}
