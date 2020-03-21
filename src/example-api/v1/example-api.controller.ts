import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
  Res,
} from '@nestjs/common'
import { Response } from 'express'

import IExampleApi from './example-api.interface'
import MessageUtil, { IMessage } from '../../utils/messages.util'
import ResponseUtil from '../../utils/response.util'

@Controller('v1/example-api')
export class ExampleApiController {
  @Post()
  async create(@Res() res: Response, @Body() exampleApi: IExampleApi) {
    const message: IMessage = MessageUtil.example.info.create
    message.result = exampleApi

    return ResponseUtil.handle(res, message)
  }

  @Get()
  async findAll(@Res() res: Response, @Query() query: any) {
    const message: IMessage = MessageUtil.example.info.findAll
    message.result = query

    return ResponseUtil.handle(res, message)
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const message: IMessage = MessageUtil.example.info.findOne
    message.message += `- id: ${id}`

    return ResponseUtil.handle(res, message)
  }

  @Put(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() exampleApi: IExampleApi
  ) {
    const message: IMessage = MessageUtil.example.info.update
    message.message += `- id: ${id}`
    message.result = exampleApi

    return ResponseUtil.handle(res, message)
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    const message: IMessage = MessageUtil.example.info.delete
    message.message += `- id: ${id}`

    return ResponseUtil.handle(res, message)
  }
}
