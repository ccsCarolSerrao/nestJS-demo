import { Injectable } from '@nestjs/common'
import { v1 as uuid } from 'uuid'

import MessageUtil from '../../utils/messages.util'
import IExampleApi from './interfaces/example-api.interface'
import IExampleApiService from './interfaces/example-api-service.interface'
import ExampleApiCreateDto from './dtos/example-api-create.dto'
import ExampleApiFilterDto from './dtos/example-api-filter.dto'
import ExampleApiUpdateDto from './dtos/example-api-update.dto'

@Injectable()
export default class ExampleApiService implements IExampleApiService {
    private examples: IExampleApi[] = []

    async create(exampleApi: ExampleApiCreateDto) {
        const newExampleApi: IExampleApi = Object.assign({}, exampleApi)
        newExampleApi.id = uuid()

        this.examples.push(newExampleApi)

        return newExampleApi
    }

    async findOne(id: string) {
        return this.examples.find(e => e.id === id)
    }

    async findAll(filter: ExampleApiFilterDto) {
        return this.examples.filter(e => e.id === (filter.id ?? e.id) && e.name === (filter.name ?? e.name) && e.email === (filter.email ?? e.email))
    }

    async update(exampleApi: ExampleApiUpdateDto, id: string) {
        const oldExampleApi = await this.findOne(id)

        if (!oldExampleApi) {
            throw MessageUtil.example.error.notFound
        }

        this.delete(id)

        oldExampleApi.name = exampleApi.name ?? oldExampleApi.name
        oldExampleApi.email = exampleApi.email ?? oldExampleApi.email
        oldExampleApi.number = exampleApi.number ?? oldExampleApi.number
        oldExampleApi.value = exampleApi.value ?? oldExampleApi.value

        this.examples.push(oldExampleApi)

        return oldExampleApi
    }

    async delete(id: string) {
        const oldExampleApi = await this.findOne(id)

        if (!oldExampleApi) {
            throw MessageUtil.example.error.notFound
        }

        const newExampleApi = this.examples.filter(e => e.id !== id)

        this.examples = newExampleApi
    }
}
