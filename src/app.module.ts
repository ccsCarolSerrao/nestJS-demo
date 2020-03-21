import { Module } from '@nestjs/common'
import { ExampleApiController } from './example-api/v1/example-api.controller'

@Module({
  imports: [],
  controllers: [ExampleApiController],
})
export class AppModule {}
