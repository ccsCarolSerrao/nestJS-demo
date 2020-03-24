import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { Request } from 'express'

import KeycloakJwtDto from '../auth/dtos/keycloak-jwt.dto'
import MessageUtil from 'utils/messages.util'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        if (!roles) {
            return true
        }
        const request = context.switchToHttp().getRequest<Request>()
        const user = request.user as KeycloakJwtDto

        if (this.hasPermission(roles, user['example-api']?.roles)) {
            return true
        }

        throw MessageUtil.authentication.error.userActionNotAllowed
    }

    protected hasPermission(roles: string[], userRoles: string[]) {
        return roles?.some(r => userRoles?.includes(r))
    }
}
