import { Controller, Get, Post, Body, Query, Param, Put, Delete, HttpCode } from '@nestjs/common'

import ExampleApiFilterDto from './dtos/example-api-filter.dto'
import ExampleApiCreateDto from './dtos/example-api-create.dto'
import ExampleApiUpdateDto from './dtos/example-api-update.dto'
import ExampleApiService from './example-api.service'

@Controller('v1/example-api')
export default class ExampleApiController {
    constructor(private exampleService: ExampleApiService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() exampleApi: ExampleApiCreateDto) {
        return await this.exampleService.create(exampleApi)
    }

    @Get()
    async findAll(@Query() query: ExampleApiFilterDto) {
        return await this.exampleService.findAll(query)
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.exampleService.findOne(id)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() exampleApi: ExampleApiUpdateDto) {
        return await this.exampleService.update(exampleApi, id)
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.exampleService.delete(id)
    }
}
