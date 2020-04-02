import { INestApplication } from '@nestjs/common'
import helmet from 'helmet'

export default class AppUtil {
    public static config(app: INestApplication) {
        app.use(helmet.noSniff())
        app.use(helmet.hidePoweredBy())
        app.use(helmet.hsts())

        app.setGlobalPrefix('api')
    }
}
