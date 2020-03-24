/* eslint-disable camelcase */
export default class KeycloakJwtDto {
    preferred_username!: string
    locale!: string
    given_name!: string
    family_name!: string
    name!: string
    email_verified!: boolean
    email!: string
    'example-api': ExampleApiRoleDto
}

class ExampleApiRoleDto {
    roles!: string[]
}
