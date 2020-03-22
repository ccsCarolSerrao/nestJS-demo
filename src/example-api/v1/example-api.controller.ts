import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common'

import ExampleApiService from '../../example-api/v1/example-api.service'
import ExampleApiDto from './dtos/example-api.dto'
import ExampleApiFilterDto from './dtos/example-api-filter.dto'

@Controller('v1/example-api')
export default class ExampleApiController {
  constructor(private exampleService: ExampleApiService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() exampleApi: ExampleApiDto) {
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
  async update(@Param('id') id: string, @Body() exampleApi: ExampleApiDto) {
    return await this.exampleService.update(exampleApi, id)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.exampleService.delete(id)
  }
}
