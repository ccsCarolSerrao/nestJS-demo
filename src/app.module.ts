import { Module } from '@nestjs/common'
import ExampleApiModule from './example-api/v1/example-api.module'

@Module({
    imports: [ExampleApiModule],
})
export class AppModule {}
