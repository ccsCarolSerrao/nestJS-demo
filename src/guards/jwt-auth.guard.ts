import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import MessageUtil from '../utils/messages.util'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context)
    }

    handleRequest(err: any, user: any, _info: any) {
        if (err || !user) {
            throw MessageUtil.token.error.tokenInvalid
        }

        return user
    }
}
