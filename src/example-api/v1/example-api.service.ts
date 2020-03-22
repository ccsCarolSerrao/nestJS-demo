import { Injectable } from '@nestjs/common'

import { v1 as uuid } from 'uuid'

import MessageUtil from '../../utils/messages.util'
import ExampleApi from './interfaces/example-api.interface'
import ExampleApiFilter from './interfaces/example-api-filter.interface'

@Injectable()
export default class ExampleApiService {
  private examples: ExampleApi[] = []

  async create(exampleApi: ExampleApi) {
    const newExampleApi = Object.assign({}, exampleApi)
    newExampleApi.id = uuid()

    this.examples.push(newExampleApi)

    return newExampleApi
  }

  async findOne(id: string) {
    return this.examples.find(e => e.id === id)
  }

  async findAll(filter: ExampleApiFilter) {
    return this.examples.filter(
      e =>
        e.id === (filter.id ?? e.id) &&
        e.name === (filter.name ?? e.name) &&
        e.email === (filter.email ?? e.email)
    )
  }

  async update(exampleApi: ExampleApi, id: string) {
    await this.delete(id)

    exampleApi.id = id
    this.examples.push(exampleApi)

    return exampleApi
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
