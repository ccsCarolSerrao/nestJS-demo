/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, HttpStatus } from '@nestjs/common'
import superTest from 'supertest'
import { random } from 'faker'

import ExampleApiController from '../../src/example-api/v1/example-api.controller'
import ExampleApiService from '../../src/example-api/v1/example-api.service'
import { exampleApiUpdateMock, exampleApiCreateMock } from '../../__mocks__/example-api.mock'
import IExampleApi from '../../src/example-api/v1/interfaces/example-api.interface'

const baseUrl = '/v1/example-api'

describe('App Controller', () => {
    let app: INestApplication

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ExampleApiController],
            providers: [ExampleApiService],
        }).compile()

        app = module.createNestApplication()
        await app.init()
    })

    afterAll(async () => {
        await app.close()
    })

    describe('Create', () => {
        it('shoud return a 201 status', async () => {
            return await superTest(app.getHttpServer())
                .post(`${baseUrl}/`)
                .send(exampleApiUpdateMock())
                .expect(HttpStatus.CREATED)
        })

        it('shoud return an example object in result', async () => {
            /*
      return await superTest(app.getHttpServer())
        .post(`${baseUrl}/`)
        .send(exampleApiUpdateMock())
        .expect(exampleApiUpdateMock())
    */
        })
    })

    describe('Find All', () => {
        it('shoud return a 200 status', async () => {
            await createExample(app, exampleApiCreateMock())

            return await superTest(app.getHttpServer())
                .get(`${baseUrl}/`)
                .expect(HttpStatus.OK)
        })

        it('shoud return an example object in result', async () => {
            const exampleApi: IExampleApi[] = []
            exampleApi.push(await createExample(app, exampleApiCreateMock()))
            exampleApi.push(await createExample(app, exampleApiCreateMock()))

            return await superTest(app.getHttpServer())
                .get(`${baseUrl}/`)
                .expect(exampleApi)
        })

        it('shoud return 200 when filter by id', async () => {
            const oneExampleApi = await createExample(app, exampleApiCreateMock())
            await createExample(app, exampleApiCreateMock())
            await createExample(app, exampleApiCreateMock())

            return await superTest(app.getHttpServer())
                .get(`${baseUrl}/`)
                .query({ id: oneExampleApi.id })
                .expect(HttpStatus.OK)
        })

        it('shoud return the right example object in result when filter id', async () => {
            const oneExampleApi = await createExample(app, exampleApiCreateMock())
            await createExample(app, exampleApiCreateMock())
            await createExample(app, exampleApiCreateMock())

            return await superTest(app.getHttpServer())
                .get(`${baseUrl}/`)
                .query({ id: oneExampleApi.id! })
                .expect([oneExampleApi])
        })

        it('shoud return the right example object in result when filter by email', async () => {
            const oneExampleApi = await createExample(app, exampleApiCreateMock())
            await createExample(app, exampleApiCreateMock())
            await createExample(app, exampleApiCreateMock())

            return await superTest(app.getHttpServer())
                .get(`${baseUrl}/`)
                .query({ email: oneExampleApi.email! })
                .expect([oneExampleApi])
        })

        it('shoud return the right example object in result when filter by name', async () => {
            const oneExampleApi = await createExample(app, exampleApiCreateMock())
            await createExample(app, exampleApiCreateMock())
            await createExample(app, exampleApiCreateMock())

            return await superTest(app.getHttpServer())
                .get(`${baseUrl}/`)
                .query({ name: oneExampleApi.name! })
                .expect([oneExampleApi])
        })
    })

    describe('Find One', () => {
        it('shoud return a 200 status', async () => {
            const exampleApi = await createExample(app, exampleApiCreateMock())

            return await superTest(app.getHttpServer())
                .get(`${baseUrl}/${exampleApi.id}`)
                .expect(HttpStatus.OK)
        })

        it('shoud return an example object in result', async () => {
            const exampleApi = await createExample(app, exampleApiCreateMock())

            return await superTest(app.getHttpServer())
                .get(`${baseUrl}/${exampleApi.id}`)
                .expect(exampleApi)
        })
    })

    describe('Update', () => {
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
                .send(exampleApiUpdateMock())
                .expect(HttpStatus.OK)
        })

        it('shoud return an updated example object in result', async () => {
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
                .send(exampleApiUpdate)
                .expect(newExampleApi)
        })

        it('shoud return an updated example object in result', async () => {
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
                .send(exampleApiUpdate)
                .expect(newExampleApi)
        })

        it('shoud return an updated example object in result', async () => {
            const exampleApiCreated = await createExample(app, exampleApiCreateMock())
            const exampleApiUpdate = exampleApiUpdateMock()
            exampleApiUpdate.name = exampleApiCreated.name
            exampleApiUpdate.email = exampleApiCreated.email
            exampleApiUpdate.value = exampleApiUpdate.value
            
            const newExampleApi = Object.assign({}, exampleApiCreated)
            newExampleApi.date = exampleApiUpdate.date!
            newExampleApi.number = exampleApiUpdate.number!

            return await superTest(app.getHttpServer())
                .put(`${baseUrl}/${exampleApiCreated.id}`)
                .send(exampleApiUpdate)
                .expect(newExampleApi)
        })

        it('shoud be 500 when sent a nonvailid id', async () => {
            const exampleApiCreated = await createExample(app, exampleApiCreateMock())
            const idMock = random.uuid()

            return await superTest(app.getHttpServer())
                .put(`${baseUrl}/${idMock}`)
                .send(exampleApiCreated)
                .expect(HttpStatus.INTERNAL_SERVER_ERROR)
        })
    })

    describe('Delete', () => {
        it('shoud return a 200 status', async () => {
            const exampleApi = await createExample(app, exampleApiCreateMock())

            return await superTest(app.getHttpServer())
                .delete(`${baseUrl}/${exampleApi.id}`)
                .expect(HttpStatus.OK)
        })

        it('shoud be empty', async () => {
            const exampleApi = await createExample(app, exampleApiCreateMock())

            return await superTest(app.getHttpServer())
                .delete(`${baseUrl}/${exampleApi.id}`)
                .expect({})
        })

        it('shoud be 500 when sent a nonvailid id', async () => {
            await createExample(app, exampleApiCreateMock())
            const idMock = random.uuid()

            return await superTest(app.getHttpServer())
                .delete(`${baseUrl}/${idMock}`)
                .expect(HttpStatus.INTERNAL_SERVER_ERROR)
        })
    })
})

const createExample = async (app: INestApplication, exampleApiMock: IExampleApi) => {
    const result = await superTest(app.getHttpServer())
        .post(`${baseUrl}/`)
        .send(exampleApiMock)

    const exampleApi = JSON.parse(result.text) as IExampleApi

    return exampleApi
}
