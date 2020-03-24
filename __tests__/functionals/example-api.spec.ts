/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, HttpStatus } from '@nestjs/common'

import superTest from 'supertest'
import { random } from 'faker'

import AppModule from '../../src/app.module'


import { exampleApiUpdateMock, exampleApiCreateMock } from '../../__mocks__/example-api.mock'
import IExampleApi from '../../src/example-api/v1/interfaces/example-api.interface'

import AuthService from '../../src/auth/auth.service'
import MessageUtil from '../../src/utils/messages.util'

const baseUrl = '/v1/example-api'
let tokenNoPermissionMock: string
let tokenAllPermissionMock: string

describe('Example API', () => {
    let app: INestApplication

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
            ],
        }).compile()

        app = module.createNestApplication()
        await app.init() 

        const authService = module.get<AuthService>(AuthService)
        const roles = ['example:create', 'example:search', 'example:get', 'example:update', 'example:remove']

        tokenAllPermissionMock = await authService.createJwtToken({ 'example-api': { roles } })
        tokenNoPermissionMock = await authService.createJwtToken({})
    })

    afterEach(async () => {
        await app.close()
    })

    describe('Create', () => {
        it('shoud return a 401 status when user nonautorized', async () => {
            return await superTest(app.getHttpServer())
                .post(`${baseUrl}/`)
                .set('Authorization', `Bearer ${tokenNoPermissionMock}`)
                .send(MessageUtil.authentication.error.userActionNotAllowed)
                .expect(HttpStatus.METHOD_NOT_ALLOWED)
        })

        it('shoud return a 201 status', async () => {
            return await superTest(app.getHttpServer())
                .post(`${baseUrl}/`)
                .set('Authorization', `Bearer ${tokenAllPermissionMock}`)
                .send(exampleApiUpdateMock())
                .expect(HttpStatus.CREATED)
        })

        it('shoud return an id in object result', async () => {
            /*
      return await superTest(app.getHttpServer())
        .post(`${baseUrl}/`)
        .send(exampleApiUpdateMock())
        .expect(exampleApiUpdateMock())
    */
        })
    })

    describe('Find All', () => {
        it('shoud return a 401 status when user nonautorized', async () => {
            return await superTest(app.getHttpServer())
                .get(`${baseUrl}/`)
                .set('Authorization', `Bearer ${tokenNoPermissionMock}`)
                .send(MessageUtil.authentication.error.userActionNotAllowed)
                .expect(HttpStatus.METHOD_NOT_ALLOWED)
        })

        it('shoud return a 200 status', async () => {
            await createExample(app, exampleApiCreateMock())

            return await superTest(app.getHttpServer())
                .get(`${baseUrl}/`)
                .set('Authorization', `Bearer ${tokenAllPermissionMock}`)
                .expect(HttpStatus.OK)
        })

        it('shoud return an example object in result', async () => {
            const exampleApi: IExampleApi[] = []
            exampleApi.push(await createExample(app, exampleApiCreateMock()))
            exampleApi.push(await createExample(app, exampleApiCreateMock()))

            return await superTest(app.getHttpServer())
                .get(`${baseUrl}/`)
                .set('Authorization', `Bearer ${tokenAllPermissionMock}`)
                .expect(exampleApi)
        })

        it('shoud return 200 when filter by id', async () => {
            const oneExampleApi = await createExample(app, exampleApiCreateMock())
            await createExample(app, exampleApiCreateMock())
            await createExample(app, exampleApiCreateMock())

            return await superTest(app.getHttpServer())
                .get(`${baseUrl}/`)
                .query({ id: oneExampleApi.id })
                .set('Authorization', `Bearer ${tokenAllPermissionMock}`)
                .expect(HttpStatus.OK)
        })

        it('shoud return the right example object in result when filter id', async () => {
            const oneExampleApi = await createExample(app, exampleApiCreateMock())
            await createExample(app, exampleApiCreateMock())
            await createExample(app, exampleApiCreateMock())

            return await superTest(app.getHttpServer())
                .get(`${baseUrl}/`)
                .query({ id: oneExampleApi.id! })
                .set('Authorization', `Bearer ${tokenAllPermissionMock}`)
                .expect([oneExampleApi])
        })

        it('shoud return the right example object in result when filter by email', async () => {
            const oneExampleApi = await createExample(app, exampleApiCreateMock())
            await createExample(app, exampleApiCreateMock())
            await createExample(app, exampleApiCreateMock())

            return await superTest(app.getHttpServer())
                .get(`${baseUrl}/`)
                .query({ email: oneExampleApi.email! })
                .set('Authorization', `Bearer ${tokenAllPermissionMock}`)
                .expect([oneExampleApi])
        })

        it('shoud return the right example object in result when filter by name', async () => {
            const oneExampleApi = await createExample(app, exampleApiCreateMock())
            await createExample(app, exampleApiCreateMock())
            await createExample(app, exampleApiCreateMock())

            return await superTest(app.getHttpServer())
                .get(`${baseUrl}/`)
                .query({ name: oneExampleApi.name! })
                .set('Authorization', `Bearer ${tokenAllPermissionMock}`)
                .expect([oneExampleApi])
        })
    })

    describe('Find One', () => {
        it('shoud return a 401 status when user nonautorized', async () => {
            const idMock = random.uuid()

            return await superTest(app.getHttpServer())
                .get(`${baseUrl}/${idMock}`)
                .set('Authorization', `Bearer ${tokenNoPermissionMock}`)
                .send(MessageUtil.authentication.error.userActionNotAllowed)
                .expect(HttpStatus.METHOD_NOT_ALLOWED)
        })

        it('shoud return a 200 status', async () => {
            const exampleApi = await createExample(app, exampleApiCreateMock())

            return await superTest(app.getHttpServer())
                .get(`${baseUrl}/${exampleApi.id}`)
                .set('Authorization', `Bearer ${tokenAllPermissionMock}`)
                .expect(HttpStatus.OK)
        })

        it('shoud return an example object in result', async () => {
            const exampleApi = await createExample(app, exampleApiCreateMock())

            return await superTest(app.getHttpServer())
                .get(`${baseUrl}/${exampleApi.id}`)
                .set('Authorization', `Bearer ${tokenAllPermissionMock}`)
                .expect(exampleApi)
        })
    })

    describe('Update', () => {
        it('shoud return a 401 status when user nonautorized', async () => {
            const idMock = random.uuid()

            return await superTest(app.getHttpServer())
                .put(`${baseUrl}/${idMock}`)
                .set('Authorization', `Bearer ${tokenNoPermissionMock}`)
                .send(MessageUtil.authentication.error.userActionNotAllowed)
                .expect(HttpStatus.METHOD_NOT_ALLOWED)
        })

        it('shoud return a 200 status', async () => {
            const exampleApiCreated = await createExample(app, exampleApiCreateMock())
            const exampleApiUpdate = exampleApiUpdateMock()

            const newExampleApi = Object.assign({}, exampleApiCreated)
            newExampleApi.name = exampleApiUpdate.name!
            newExampleApi.email = exampleApiUpdate.email!
            newExampleApi.date = exampleApiUpdate.date!
            newExampleApi.number = exampleApiUpdate.number!
            newExampleApi.value = exampleApiUpdate.value!

            return await superTest(app.getHttpServer())
                .put(`${baseUrl}/${exampleApiCreated.id}`)
                .set('Authorization', `Bearer ${tokenAllPermissionMock}`)
                .send(exampleApiUpdateMock())
                .expect(HttpStatus.OK)
        })

        it('shoud return an updated example object in result when change all fields', async () => {
            const exampleApiCreated = await createExample(app, exampleApiCreateMock())
            const exampleApiUpdate = exampleApiUpdateMock()

            const newExampleApi = Object.assign({}, exampleApiCreated)
            newExampleApi.name = exampleApiUpdate.name!
            newExampleApi.email = exampleApiUpdate.email!
            newExampleApi.date = exampleApiUpdate.date!
            newExampleApi.value = exampleApiUpdate.value!
            newExampleApi.number = exampleApiUpdate.number!

            return await superTest(app.getHttpServer())
                .put(`${baseUrl}/${exampleApiCreated.id}`)
                .set('Authorization', `Bearer ${tokenAllPermissionMock}`)
                .send(exampleApiUpdate)
                .expect(newExampleApi)
        })

        it('shoud return an updated example object in result when change date and number', async () => {
            const exampleApiCreated = await createExample(app, exampleApiCreateMock())
            const exampleApiUpdate = exampleApiUpdateMock()
            exampleApiUpdate.date = exampleApiCreated.date
            exampleApiUpdate.number = exampleApiCreated.number

            const newExampleApi = Object.assign({}, exampleApiCreated)
            newExampleApi.name = exampleApiUpdate.name!
            newExampleApi.email = exampleApiUpdate.email!
            newExampleApi.value = exampleApiUpdate.value!

            return await superTest(app.getHttpServer())
                .put(`${baseUrl}/${exampleApiCreated.id}`)
                .set('Authorization', `Bearer ${tokenAllPermissionMock}`)
                .send(exampleApiUpdate)
                .expect(newExampleApi)
        })

        it('shoud return an updated example object in result when change name, email and value', async () => {
            const exampleApiCreated = await createExample(app, exampleApiCreateMock())
            const exampleApiUpdate = exampleApiUpdateMock()
            exampleApiUpdate.name = exampleApiCreated.name
            exampleApiUpdate.email = exampleApiCreated.email
            exampleApiUpdate.value = exampleApiCreated.value

            const newExampleApi = Object.assign({}, exampleApiCreated)
            newExampleApi.date = exampleApiUpdate.date!
            newExampleApi.number = exampleApiUpdate.number!

            return await superTest(app.getHttpServer())
                .put(`${baseUrl}/${exampleApiCreated.id}`)
                .set('Authorization', `Bearer ${tokenAllPermissionMock}`)
                .send(exampleApiUpdate)
                .expect(newExampleApi)
        })

        it('shoud be 404 when sent a nonvailid id', async () => {
            await createExample(app, exampleApiCreateMock())
            const idMock = random.uuid()

            return await superTest(app.getHttpServer())
                .put(`${baseUrl}/${idMock}`)
                .set('Authorization', `Bearer ${tokenAllPermissionMock}`)
                .send(MessageUtil.example.error.notFound)
                .expect(HttpStatus.NOT_FOUND)
        })
    })

    describe('Delete', () => {
        it('shoud return a 401 status when user nonautorized', async () => {
            const idMock = random.uuid()

            return await superTest(app.getHttpServer())
                .delete(`${baseUrl}/${idMock}`)
                .set('Authorization', `Bearer ${tokenNoPermissionMock}`)
                .send(MessageUtil.authentication.error.userActionNotAllowed)
                .expect(HttpStatus.METHOD_NOT_ALLOWED)
        })

        it('shoud return a 200 status', async () => {
            const exampleApi = await createExample(app, exampleApiCreateMock())

            return await superTest(app.getHttpServer())
                .delete(`${baseUrl}/${exampleApi.id}`)
                .set('Authorization', `Bearer ${tokenAllPermissionMock}`)
                .expect(HttpStatus.OK)
        })

        it('shoud be empty', async () => {
            const exampleApi = await createExample(app, exampleApiCreateMock())

            return await superTest(app.getHttpServer())
                .delete(`${baseUrl}/${exampleApi.id}`)
                .set('Authorization', `Bearer ${tokenAllPermissionMock}`)
                .expect({})
        })

        it('shoud be 404 when sent a nonvailid id', async () => {
            await createExample(app, exampleApiCreateMock())
            const idMock = random.uuid()

            return await superTest(app.getHttpServer())
                .delete(`${baseUrl}/${idMock}`)
                .set('Authorization', `Bearer ${tokenAllPermissionMock}`)
                .send(MessageUtil.example.error.notFound)
                .expect(HttpStatus.NOT_FOUND)
        })
    })
})

const createExample = async (app: INestApplication, exampleApiMock: IExampleApi) => {
    const result = await superTest(app.getHttpServer())
        .post(`${baseUrl}/`)
        .set('Authorization', `Bearer ${tokenAllPermissionMock}`)
        .send(exampleApiMock)

    const exampleApi = JSON.parse(result.text) as IExampleApi

    return exampleApi
}
