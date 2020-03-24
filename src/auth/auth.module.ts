import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import keycloakConfig from 'configs/keycloak.config'
import { JwtStrategy } from './jwt.strategy'

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: keycloakConfig().secret,
        }),
    ],
    providers: [JwtStrategy],
})
export class AuthModule {}
