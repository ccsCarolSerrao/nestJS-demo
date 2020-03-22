import { Module } from '@nestjs/common'
import ExampleApiController from './example-api/v1/example-api.controller'
import ExampleApiService from './example-api/v1/example-api.service'

@Module({
  imports: [],
  controllers: [ExampleApiController],
  providers: [ExampleApiService],
})
export class AppModule {}
