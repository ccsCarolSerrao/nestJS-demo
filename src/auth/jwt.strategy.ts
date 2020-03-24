import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

import { ExtractJwt, Strategy } from 'passport-jwt'

import { plainToClass } from 'class-transformer'

import keycloakConfig from 'configs/keycloak.config'
import KeycloakJwtDto from './dtos/keycloak-jwt.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: keycloakConfig().secret,
        })
    }

    async validate(payload: any) {
        console.log(payload)
        console.log(plainToClass(KeycloakJwtDto, payload))
        return plainToClass(KeycloakJwtDto, payload)
    }
}
