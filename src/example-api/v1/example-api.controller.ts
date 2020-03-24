import { Controller, Get, Post, Body, Query, Param, Put, Delete, HttpCode, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../../guards/jwt-auth.guard'
import { RolesGuard } from '../../guards/role.guard'

import { Roles } from '../../decorators/role.decorator'

import ExampleApiService from './example-api.service'

import ExampleApiFilterDto from './dtos/example-api-filter.dto'
import ExampleApiCreateDto from './dtos/example-api-create.dto'
import ExampleApiUpdateDto from './dtos/example-api-update.dto'

@Controller('v1/example-api')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
export default class ExampleApiController {
    constructor(private exampleService: ExampleApiService) {}

    @Post()
    @HttpCode(201)
    @Roles('example:create')
    async create(@Body() exampleApi: ExampleApiCreateDto) {
        return await this.exampleService.create(exampleApi)
    }

    @Get()
    @Roles('example:search')
    async findAll(@Query() query: ExampleApiFilterDto) {
        return await this.exampleService.findAll(query)
    }

    @Get(':id')
    @Roles('example:get')
    async findOne(@Param('id') id: string) {
        return await this.exampleService.findOne(id)
    }

    @Put(':id')
    @Roles('example:update')
    async update(@Param('id') id: string, @Body() exampleApi: ExampleApiUpdateDto) {
        return await this.exampleService.update(exampleApi, id)
    }

    @Delete(':id')
    @Roles('example:remove')
    async remove(@Param('id') id: string) {
        return await this.exampleService.delete(id)
    }
}
