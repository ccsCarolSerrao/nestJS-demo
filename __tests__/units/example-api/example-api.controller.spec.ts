import { Test, TestingModule } from '@nestjs/testing'
import { Response } from 'express'
import { random } from 'faker'

import { responseMock } from '../../../__mocks__/express/response.mock'
import { exampleApiMock } from '../../../__mocks__/example-api.mock'

import { ExampleApiController } from '../../../src/example-api/v1/example-api.controller'
import IExampleApi from '../../../src/example-api/v1/example-api.interface'
import MessageUtil from '../../../src/utils/messages.util'

describe('Example Api Controller', () => {
  let controller: ExampleApiController
  let resMock: Response
  let exampleMock: IExampleApi
  let idMock: string

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleApiController],
    }).compile()

    controller = module.get<ExampleApiController>(ExampleApiController)

    resMock = responseMock()
    idMock = random.uuid()
    exampleMock = Object.assign({}, exampleApiMock)
    delete exampleMock['id']
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('Create', () => {
    it('should return a create message when sent a valid body', async () => {
      const result = await controller.create(resMock, exampleMock)
      
      expect(result.json).toHaveBeenCalledWith(MessageUtil.example.info.create)
    })

    it('should return a create status when sent a valid body', async () => {
      const result = await controller.create(resMock, exampleMock)
      
      expect(result.status).toHaveBeenCalledWith(MessageUtil.example.info.create.status)})

    it('should return an error create message when sent a nonvalid body', async () => {})

    it('should return an error create status when sent a nonvalid body', async () => {})
  })

  describe('Find All', () => {
    it('should return a findall message when sent a valid body', async () => {
      const result = await controller.findAll(resMock, null)
      
      expect(result.json).toHaveBeenCalledWith(MessageUtil.example.info.findAll)
    })

    it('should return a findall status when sent a valid body', async () => {
      const result = await controller.findAll(resMock, null)
      
      expect(result.status).toHaveBeenCalledWith(MessageUtil.example.info.findAll.status)})

    it('should return an error findall message when sent a nonvalid body', async () => {})

    it('should return an error findall status when sent a nonvalid body', async () => {})
  })

  describe('Find One', () => {
    it('should return a findone message when sent a valid body', async () => {
      const result = await controller.findOne(resMock, idMock)
      
      expect(result.json).toHaveBeenCalledWith(MessageUtil.example.info.findOne)
    })

    it('should return a findone status when sent a valid body', async () => {
      const result = await controller.findOne(resMock, idMock)
      
      expect(result.status).toHaveBeenCalledWith(MessageUtil.example.info.findOne.status)})

    it('should return an error findone message when sent a nonvalid body', async () => {})

    it('should return an error findone status when sent a nonvalid body', async () => {})
  })

  describe('Update', () => {
    it('should return a update message when sent a valid body', async () => {
      const result = await controller.update(resMock, idMock, exampleMock)
      
      expect(result.json).toHaveBeenCalledWith(MessageUtil.example.info.update)
    })

    it('should return a update status when sent a valid body', async () => {
      const result = await controller.update(resMock,idMock, exampleMock)
      
      expect(result.status).toHaveBeenCalledWith(MessageUtil.example.info.update.status)})

    it('should return an error update message when sent a nonvalid body', async () => {})

    it('should return an error update status when sent a nonvalid body', async () => {})
  })

  describe('Delete', () => {
    it('should return a delete message when sent a valid id', async () => {
      const result = await controller.remove(resMock, idMock)
      
      expect(result.json).toHaveBeenCalledWith(MessageUtil.example.info.delete)
    })

    it('should return a delete status when sent a valid id', async () => {
      const result = await controller.remove(resMock, idMock)
      
      expect(result.status).toHaveBeenCalledWith(MessageUtil.example.info.delete.status)})

    it('should return an error delete message when sent a nonvalid id', async () => {})

    it('should return an error delete status when sent a nonvalid id', async () => {})
  })
})
