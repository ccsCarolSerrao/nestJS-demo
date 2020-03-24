import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import KeycloakJwtDto from './dtos/keycloak-jwt.dto'

@Injectable()
export default class AuthService {
    constructor(private jwtService: JwtService) {}

    async createJwtToken(payload: KeycloakJwtDto) {
        return this.jwtService.sign(payload)
    }
}
