import { registerAs } from '@nestjs/config'

export default registerAs('keycloak', () => ({
    issuer: process.env.KEYCLOAK_ISSUER ?? '',
    secret: process.env.KEYCLOAK_SECRET ?? '',
    claim: process.env.KEYCLOAK_CLAIM ?? '',
}))
