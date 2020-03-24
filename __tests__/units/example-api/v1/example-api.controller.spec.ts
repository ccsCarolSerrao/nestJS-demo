/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-undef */
import { Test, TestingModule } from '@nestjs/testing'
import { random } from 'faker'

import {JwtAuthGuard} from '../../../../src/guards/jwt-auth.guard'
import {RolesGuard} from '../../../../src/guards/role.guard'

import ExampleApiService from '../../../../src/example-api/v1/example-api.service'
import ExampleApiController from '../../../../src/example-api/v1/example-api.controller'

import MessageUtil from '../../../../src/utils/messages.util'
import IExampleApi from '../../../../src/example-api/v1/interfaces/example-api.interface'
import ExampleApiFilterDto from '../../../../src/example-api/v1/dtos/example-api-filter.dto'

import { exampleApiCreateMock } from '../../../../__mocks__/example-api.mock'

describe('Example Api Controller', () => {
    let controller: ExampleApiController
    let service: ExampleApiService

    let idMock: string

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ExampleApiController],
            providers: [JwtAuthGuard, RolesGuard, ExampleApiService],
        }).compile()

        service = module.get<ExampleApiService>(ExampleApiService)
        controller = module.get<ExampleApiController>(ExampleApiController)

        idMock = random.uuid()
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
        expect(controller).toBeDefined()
    })

    describe('Create', () => {
        it('should return a new example object when sent a valid body', async () => {
            const resultServiceMock = await buildServiceCreateMock(service)

            const result = await controller.create(exampleApiCreateMock())

            expect(result).toBe(resultServiceMock)
        })
    })

    describe('Find All', () => {
        let filterMock: ExampleApiFilterDto

        beforeEach(async () => {
            filterMock = new ExampleApiFilterDto()
        })

        it('should return all examples object created when sent a valid filter', async () => {
            const resultServiceMock: IExampleApi[] = await buildServiceFindAllMock(service)
            const result = await controller.findAll(filterMock)

            expect(result).toBe(resultServiceMock)
        })

        it('should return a null object  when sent a nonvalid filter', async () => {
            const resultServiceMock: IExampleApi[] = await buildServiceFindAllMock(service, true)

            const newIdMock = random.uuid()
            filterMock.id = newIdMock

            const result = await controller.findAll(filterMock)

            expect(result).toBe(resultServiceMock)
        })
    })

    describe('Find One', () => {
        it('should return an example object when sent a valid id', async () => {
            const resultServiceMock: IExampleApi | undefined = await buildServiceFindOneMock(service)

            const result = await controller.findOne((resultServiceMock as IExampleApi).id!)

            expect(result).toBe(resultServiceMock)
        })

        it('should return undefined when sent a nonvalid id', async () => {
            const resultServiceMock: IExampleApi | undefined = await buildServiceFindOneMock(service, true)

            const result = await controller.findOne(idMock)

            expect(result).toBe(resultServiceMock)
        })
    })

    describe('Update', () => {
        it('should return an example object when sent a valid id', async () => {
            const resultServiceMock: IExampleApi | undefined = await buildServiceUpdateMock(service)

            const exampleCreateMock = exampleApiCreateMock()
            const result = await controller.update(random.uuid(), exampleCreateMock)

            expect(result).toBe(resultServiceMock)
        })

        it('should return throw an error when sent a nonvalid id', async () => {
            await buildServiceUpdateMock(service, true)

            try {
                await controller.update(idMock, exampleApiCreateMock())
            } catch (error) {
                expect(error).toBe(MessageUtil.example.error.notFound)
            }
        })
    })

    describe('Delete', () => {
        it('should void when sent a valid id', async () => {
            const resultServiceMock = await buildServiceDeleteMock(service)
            const result = await controller.remove(idMock)

            expect(result).toBe(resultServiceMock)
        })

        it('should throw an error when sent a nonvalid id', async () => {
            await buildServiceDeleteMock(service, true)

            try {
                await controller.remove(idMock)
            } catch (error) {
                expect(error).toBe(MessageUtil.example.error.notFound)
            }
        })
    })
})

const buildServiceCreateMock = async (service: ExampleApiService) => {
    const resultServicePromise = Promise.resolve(exampleApiCreateMock())

    jest.spyOn(service, 'create').mockImplementation(() => resultServicePromise)

    return resultServicePromise
}

const buildServiceFindOneMock = async (service: ExampleApiService, isUndefined = false) => {
    let serviceMock: IExampleApi | undefined

    if (!isUndefined) {
        serviceMock = exampleApiCreateMock()
    }

    const resultServicePromise = Promise.resolve(serviceMock)

    jest.spyOn(service, 'findOne').mockImplementation(() => resultServicePromise)

    return serviceMock
}

const buildServiceFindAllMock = async (service: ExampleApiService, isEmpty = false) => {
    const serviceListMock: IExampleApi[] = []

    if (!isEmpty) {
        serviceListMock.push(exampleApiCreateMock())
        serviceListMock.push(exampleApiCreateMock())
        serviceListMock.push(exampleApiCreateMock())
    }
    const resultServicePromise = Promise.resolve(serviceListMock)

    jest.spyOn(service, 'findAll').mockImplementation(() => resultServicePromise)

    return resultServicePromise
}

const buildServiceUpdateMock = async (service: ExampleApiService, isError = false) => {
    if (isError) {
        jest.spyOn(service, 'update').mockImplementation(() => {
            throw MessageUtil.example.error.notFound
        })
        return
    }

    const resultServicePromise = Promise.resolve(exampleApiCreateMock())

    jest.spyOn(service, 'update').mockImplementation(() => resultServicePromise)

    return resultServicePromise
}

const buildServiceDeleteMock = async (service: ExampleApiService, isError = false) => {
    if (isError) {
        jest.spyOn(service, 'delete').mockImplementation(() => {
            throw MessageUtil.example.error.notFound
        })
        return
    }

    jest.spyOn(service, 'delete').mockImplementation()
}
