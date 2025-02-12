import { CreateCategoryBillDTO, GetCategoryBillDTO } from '@business/dtos';
import { CreateCategoryBillUseCase } from '@business/use-cases/category-bill/create-category-bill.usecase';
import { GetAllCategoryBillUseCase } from '@business/use-cases/category-bill/get-all-category-bill.usecase';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller({ path: 'category-bills', version: '1' })
export class CategoryBillController {
  constructor(
    private readonly createCategoryBillUseCase: CreateCategoryBillUseCase,
    private readonly getAllCategoryBillUseCase: GetAllCategoryBillUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a category bill',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/CreateCategoryBillDTO',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The category bill has been successfully created',
    type: GetCategoryBillDTO,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateCategoryBillDTO) {
    return await this.createCategoryBillUseCase.execute(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all category bills',
  })
  @ApiOkResponse({
    description: 'The category bills have been successfully retrieved',
    type: [GetCategoryBillDTO],
  })
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('search') filter: string) {
    return await this.getAllCategoryBillUseCase.execute(filter);
  }
}
