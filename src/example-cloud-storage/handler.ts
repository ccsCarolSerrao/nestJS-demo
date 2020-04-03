import { NestFactory } from '@nestjs/core'
import ExampleCloudStorageModule from './example-cloud-storage.module'
import ExampleCloudStorageService from './example-cloud-storage.service'

const bootstrap = async () => {
    const app = await NestFactory.createApplicationContext(ExampleCloudStorageModule)
    const service = app.get(ExampleCloudStorageService)

    return service
}

const handle = async (data: any, _context: any) => {
    const service = await bootstrap()

    const file = data
    if (file.resourceState === 'not_exists') {
        console.log(`File ${file.name} deleted.`)
    } else if (file.metageneration === '1') {
        await service.publishToTopic()
        console.log(`File ${file.name} uploaded.`)
    } else {
        await service.publishToTopic()
        console.log(`File ${file.name} metadata updated.`)
    }
}

export const exampleCloudStorage = handle
