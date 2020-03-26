/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Test, TestingModule } from '@nestjs/testing'
import { random, name, internet } from 'faker'

import ExampleApiService from '../../../../src/example-api/v1/example-api.service'
import IExampleApi from '../../../../src/example-api/v1/interfaces/example-api.interface'
import ExampleApiFilterDto from '../../../../src/example-api/v1/dtos/example-api-filter.dto'
import { exampleApiCreateMock } from '../../../../__mocks__/example-api.mock'
import ExampleApiCreateDto from '../../../../src/example-api/v1/dtos/example-api-create.dto'
import ExampleApiUpdateDto from '../../../../src/example-api/v1/dtos/example-api-update.dto'
import MessageUtil from '../../../../src/utils/messages.util'

describe('ExampleApiService', () => {
    let service: ExampleApiService
    let exampleCreatedMock: IExampleApi

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ExampleApiService],
        }).compile()

        service = module.get<ExampleApiService>(ExampleApiService)

        exampleCreatedMock = await createExampleMock(service, exampleApiCreateMock())
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('Create', () => {
        it('should return an example object with id', async () => {
            expect(exampleCreatedMock).toHaveProperty('id')
        })
    })

    describe('Find All', () => {
        it('should return an example list object when no filter', async () => {
            await createExampleMock(service, exampleApiCreateMock())
            await createExampleMock(service, exampleApiCreateMock())

            const filterMock: ExampleApiFilterDto = {}

            const result = await service.findAll(filterMock)

            expect(result).toHaveLength(3)
        })

        it('should return a example object when filter by id', async () => {
            await createExampleMock(service, exampleApiCreateMock())
            await createExampleMock(service, exampleApiCreateMock())
            await createExampleMock(service, exampleApiCreateMock())

            const filterMock: ExampleApiFilterDto = { id: exampleCreatedMock.id }

            const result = await service.findAll(filterMock)

            expect(result).toEqual([exampleCreatedMock])
        })

        it('should return a example object when filter by name', async () => {
            await createExampleMock(service, exampleApiCreateMock())
            await createExampleMock(service, exampleApiCreateMock())
            await createExampleMock(service, exampleApiCreateMock())

            const filterMock: ExampleApiFilterDto = { name: exampleCreatedMock.name }

            const result = await service.findAll(filterMock)

            expect(result).toEqual([exampleCreatedMock])
        })

        it('should return a example object when filter by email', async () => {
            await createExampleMock(service, exampleApiCreateMock())
            await createExampleMock(service, exampleApiCreateMock())
            await createExampleMock(service, exampleApiCreateMock())

            const filterMock: ExampleApiFilterDto = {
                email: exampleCreatedMock.email,
            }

            const result = await service.findAll(filterMock)

            expect(result).toEqual([exampleCreatedMock])
        })

        it('should return a example object when filter by all filters', async () => {
            await createExampleMock(service, exampleApiCreateMock())
            await createExampleMock(service, exampleApiCreateMock())
            await createExampleMock(service, exampleApiCreateMock())

            const filterMock: ExampleApiFilterDto = {
                id: exampleCreatedMock.id,
                name: exampleCreatedMock.name,
                email: exampleCreatedMock.email,
            }

            const result = await service.findAll(filterMock)

            expect(result).toEqual([exampleCreatedMock])
        })

        it('should return an empty example list object when sent a nonvalid filter ', async () => {
            await createExampleMock(service, exampleApiCreateMock())
            await createExampleMock(service, exampleApiCreateMock())
            await createExampleMock(service, exampleApiCreateMock())

            const idMock = random.uuid()
            const filterMock: ExampleApiFilterDto = { id: idMock }

            const result = await service.findAll(filterMock)

            expect(result).toEqual([])
        })
    })

    describe('Find One', () => {
        it('should return a example object when sent a valid id', async () => {
            await createExampleMock(service, exampleApiCreateMock())
            await createExampleMock(service, exampleApiCreateMock())
            await createExampleMock(service, exampleApiCreateMock())

            const result = await service.findOne(exampleCreatedMock.id!)

            expect(result).toEqual(exampleCreatedMock)
        })

        it('should return an empty example list object when sent a nonvalid id ', async () => {
            await createExampleMock(service, exampleApiCreateMock())
            await createExampleMock(service, exampleApiCreateMock())
            await createExampleMock(service, exampleApiCreateMock())

            const idMock = random.uuid()
            const result = await service.findOne(idMock)

            expect(result).toEqual(undefined)
        })
    })

    describe('Update', () => {
        it('should return a updated example object', async () => {
            const exampleApiUpdate = { name: name.findName(), email: internet.email() } as ExampleApiUpdateDto

            const newExampleApi = Object.assign({}, exampleCreatedMock)
            newExampleApi.name = exampleApiUpdate.name!
            newExampleApi.email = exampleApiUpdate.email!

            const result = await service.update(exampleApiUpdate, exampleCreatedMock.id!)

            expect(result).toEqual(newExampleApi)
        })

        it('should thorw an error when sent a nonvalid id ', async () => {
            const exampleApiUpdate = { name: name.findName(), email: internet.email() } as ExampleApiUpdateDto

            const newExampleApi = Object.assign({}, exampleCreatedMock)
            newExampleApi.name = exampleApiUpdate.name!
            newExampleApi.email = exampleApiUpdate.email!

            const idMock = random.uuid()

            try {
                await service.update(exampleApiUpdate, idMock)
            } catch (error) {
                expect(error).toBe(MessageUtil.example.error.notFound)
            }
        })
    })

    describe('Delete', () => {
        it('should delete an example object', async () => {
            const result = await service.delete(exampleCreatedMock.id!)

            expect(result).toBe(undefined)
        })

        it('should thorw an error when sent a nonvalid id ', async () => {
            const idMock = random.uuid()

            try {
                await service.delete(idMock)
            } catch (error) {
                expect(error).toBe(MessageUtil.example.error.notFound)
            }
        })
    })
})

const createExampleMock = async (service: ExampleApiService, exampleApiMock: ExampleApiCreateDto) => {
    return await service.create(exampleApiMock)
}
