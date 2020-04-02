import { NestFactory } from '@nestjs/core'
import AppModule from './app.module'
import AppUtil from './utils/app.util'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    AppUtil.config(app)

    await app.listen(3000)
}
bootstrap()
