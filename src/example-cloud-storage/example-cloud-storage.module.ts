
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import keycloakConfig from '../configs/keycloak.config'
import ExampleCloudStorageService from './example-cloud-storage.service'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env.local',
            load: [keycloakConfig],
        }),
    ],
    providers: [ExampleCloudStorageService],
})
export default class ExampleCloudStorageModule {}
