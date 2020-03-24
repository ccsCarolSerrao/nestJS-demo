import { registerAs } from '@nestjs/config'

export default registerAs('keycloak', () => ({
    issuer: process.env.KEYCLOAK_ISSUER ?? 'oi',
    audience: process.env.KEYCLOAK_AUDIENCE ?? 'oi',
    expiresIn: process.env.KEYCLOAK_EXPIRATION_IN ?? '10h',
    secret: process.env.KEYCLOAK_SECRET ?? 'oi',
    claim: process.env.KEYCLOAK_CLAIM ?? 'oi',
}))
