import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import AuthService from './auth.service'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('keycloak.secret'),
                signOptions: {
                    issuer: configService.get<string>('keycloak.issuer'),
                    audience: configService.get<string>('keycloak.audience'),
                    expiresIn: configService.get<string>('keycloak.expiresIn'),
                },
                verifyOptions: {
                    issuer: configService.get<string>('keycloak.issuer'),
                    audience: configService.get<string>('keycloak.audience'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [ConfigService, AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
