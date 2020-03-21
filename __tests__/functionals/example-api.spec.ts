import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, HttpStatus } from '@nestjs/common'
import superTest from 'supertest'
import { ExampleApiController } from '../../src/example-api/v1/example-api.controller'

describe('App Controller', () => {
  let app: INestApplication
  let baseUrl = '/v1/example-api'

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleApiController],
    }).compile()

    app = module.createNestApplication()
    await app.init()
  })

  describe('Create', () => {
    it('shoud return a 201 status', async () => {
      return await superTest(app.getHttpServer())
        .post(`${baseUrl}/`)
        .expect(HttpStatus.CREATED)
    })
  })

  describe('Find All', () => {
    it('shoud return a 200 status', async () => {
      return await superTest(app.getHttpServer())
        .get(`${baseUrl}/`)
        .expect(HttpStatus.OK)
    })
  })
  describe('Find Onde', () => {
    it('shoud return a 200 status', async () => {
      return await superTest(app.getHttpServer())
        .get(`${baseUrl}/1`)
        .expect(HttpStatus.OK)
    })
  })

  describe('Update', () => {
    it('shoud return a 200 status', async () => {
      return await superTest(app.getHttpServer())
        .put(`${baseUrl}/1`)
        .expect(HttpStatus.OK)
    })
  })
  
  describe('Create', () => {
    it('shoud return a 200 status', async () => {
      return await superTest(app.getHttpServer())
        .delete(`${baseUrl}/1`)
        .expect(HttpStatus.OK)
    })
  })
})
