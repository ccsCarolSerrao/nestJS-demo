import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, HttpStatus } from '@nestjs/common'
import superTest from 'supertest'
import { random, internet, name } from 'faker'

import ExampleApiController from '../../src/example-api/v1/example-api.controller'
import ExampleApiService from '../../src/example-api/v1/example-api.service'
import { exampleApiMock } from '../../__mocks__/example-api.mock'
import ExampleApi from '../../src/example-api/v1/interfaces/example-api.interface'

let baseUrl = '/v1/example-api'

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
        .send(exampleApiMock)
        .expect(HttpStatus.CREATED)
    })

    it('shoud return an example object in result', async () => {
      /*
      return await superTest(app.getHttpServer())
        .post(`${baseUrl}/`)
        .send(exampleApiMock)
        .expect(exampleApiMock)
    */
    })
  })

  describe('Find All', () => {
    it('shoud return a 200 status', async () => {
      await createExample(app)

      return await superTest(app.getHttpServer())
        .get(`${baseUrl}/`)
        .expect(HttpStatus.OK)
    })

    it('shoud return an example object in result', async () => {
      const exampleApi: ExampleApi[] = []
      exampleApi.push(await createExample(app))
      exampleApi.push(await createExample(app))

      return await superTest(app.getHttpServer())
        .get(`${baseUrl}/`)
        .expect(exampleApi)
    })

    it('shoud return 200 when using a filter', async () => {
      const exampleApi: ExampleApi[] = []

      const oneExampleApi = await createExample(app)
      oneExampleApi.id = random.uuid()
      exampleApi.push(oneExampleApi)

      exampleApi.push(await createExample(app))

      return await superTest(app.getHttpServer())
        .get(`${baseUrl}/`)
        .query({ id: oneExampleApi.id })
        .expect(HttpStatus.OK)
    })

    it('shoud return the right example object in result when filter id', async () => {
      const exampleApi: ExampleApi[] = []

      const oneExampleApi = await createExample(app)
      oneExampleApi.id = random.uuid()
      exampleApi.push(oneExampleApi)

      exampleApi.push(await createExample(app))

      console.log(exampleApi)

      return await superTest(app.getHttpServer())
        .get(`${baseUrl}/`)
        .query({ id: oneExampleApi.id! })
        .expect([oneExampleApi])
    })

    it('shoud return the right example object in result when filter by email', async () => {
      const exampleApi: ExampleApi[] = []

      const oneExampleApi = await createExample(app)
      oneExampleApi.email = internet.email()
      exampleApi.push(oneExampleApi)

      exampleApi.push(await createExample(app))

      console.log(exampleApi)

      return await superTest(app.getHttpServer())
        .get(`${baseUrl}/`)
        .query({ email: oneExampleApi.email! })
        .expect([oneExampleApi])
    })

    it('shoud return the right example object in result when filter by name', async () => {
      const exampleApi: ExampleApi[] = []

      const oneExampleApi = await createExample(app)
      oneExampleApi.name = name.findName()
      exampleApi.push(oneExampleApi)

      exampleApi.push(await createExample(app))

      console.log(exampleApi)

      return await superTest(app.getHttpServer())
        .get(`${baseUrl}/`)
        .query({ name: oneExampleApi.name! })
        .expect([oneExampleApi])
    })
  })

  describe('Find One', () => {
    it('shoud return a 200 status', async () => {
      const exampleApi = await createExample(app)

      return await superTest(app.getHttpServer())
        .get(`${baseUrl}/${exampleApi.id}`)
        .expect(HttpStatus.OK)
    })

    it('shoud return an example object in result', async () => {
      const exampleApi = await createExample(app)

      return await superTest(app.getHttpServer())
        .get(`${baseUrl}/${exampleApi.id}`)
        .expect(exampleApi)
    })
  })

  describe('Update', () => {
    it('shoud return a 200 status', async () => {
      const exampleApi = await createExample(app)

      return await superTest(app.getHttpServer())
        .put(`${baseUrl}/${exampleApi.id}`)
        .send(exampleApiMock)
        .expect(HttpStatus.OK)
    })

    it('shoud return an example object in result', async () => {
      const exampleApi = await createExample(app)

      return await superTest(app.getHttpServer())
        .put(`${baseUrl}/${exampleApi.id}`)
        .send(exampleApiMock)
        .expect(exampleApi)
    })
  })

  describe('Delete', () => {
    it('shoud return a 200 status', async () => {
      const exampleApi = await createExample(app)

      return await superTest(app.getHttpServer())
        .delete(`${baseUrl}/${exampleApi.id}`)
        .expect(HttpStatus.OK)
    })

    it('shoud be empty', async () => {
      const exampleApi = await createExample(app)

      return await superTest(app.getHttpServer())
        .delete(`${baseUrl}/${exampleApi.id}`)
        .expect({})
    })

    it('shoud be empty', async () => {
      await createExample(app)
      const idMock = random.uuid()

      return await superTest(app.getHttpServer())
        .delete(`${baseUrl}/${idMock}`)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR)
    })
  })
})

const createExample = async (app: INestApplication) => {
  const result = await superTest(app.getHttpServer())
    .post(`${baseUrl}/`)
    .send(exampleApiMock)

  const exampleApi = JSON.parse(result.text) as ExampleApi

  return exampleApi
}
