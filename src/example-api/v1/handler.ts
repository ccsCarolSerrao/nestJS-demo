import newrelic from 'newrelic'
import express, { Response, Request } from 'express'
newrelic.instrumentLoadedModule('express', express)

import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'

import AppUtil from '../../utils/app.util'
import ExampleApiModule from './example-api.module'
import { from } from 'rxjs'

const bootstrap = async () => {
    const instance = express()
    const adapter = new ExpressAdapter(instance)
    const app = await NestFactory.create(ExampleApiModule, adapter)

    AppUtil.config(app)

    await app.init()

    return instance
}

const server = from(bootstrap())

const handle = async (req: Request, res: Response) => {
    const handler = await server.toPromise()

    handler.locals.newrelic = newrelic

    if (!req.url) {
        req.url = req.path = '/'
    }

    return handler(req, res)
}

export const exampleApi = handle
