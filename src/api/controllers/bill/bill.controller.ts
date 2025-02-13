import {
  CreateBillDTO,
  CreateCategoryBillDTO,
  GetBillDTO,
  UpdateBillDTO,
} from '@business/dtos';
import { CreateBillUseCase } from '@business/use-cases/bill/create-bill.usecase';
import { GetBillUseCase } from '@business/use-cases/bill/get-bill.usecase';
import { GetByIdBillUseCase } from '@business/use-cases/bill/get-by-id-bill.usecase';
import { UpdateBillUseCase } from '@business/use-cases/bill/update-bill.usecase';
import { GetLoggedUser } from '@infrastructure/authentication';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller({ path: 'bills', version: '1' })
export class BillController {
  constructor(
    private readonly createBillUseCase: CreateBillUseCase,
    private readonly getBillUseCase: GetBillUseCase,
    private readonly getByIdBillUseCase: GetByIdBillUseCase,
    private readonly updateBillUseCase: UpdateBillUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a category bill',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/CreateBillDTO',
          },
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'The category bill has been successfully created',
    type: GetBillDTO,
  })
  @ApiBadRequestResponse({
    description: 'The category bill id is invalid',
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@GetLoggedUser() userId: string, @Body() data: CreateBillDTO) {
    return await this.createBillUseCase.execute({
      ...data,
      user_id: userId,
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get all bills by loggedUser',
  })
  @ApiOkResponse({
    description: 'The bills has been successfully retrieved',
    type: GetBillDTO,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'The bills not found',
  })
  @HttpCode(HttpStatus.OK)
  async getById(@GetLoggedUser() userId: string, @Param('id') id: string) {
    return await this.getByIdBillUseCase.execute(id, userId);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all bills by loggedUser',
  })
  @ApiOkResponse({
    description: 'The bills has been successfully retrieved',
    type: GetBillDTO,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  async get(@GetLoggedUser() userId: string) {
    return await this.getBillUseCase.execute(userId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a bill',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UpdateBillDTO',
          },
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'The bill has been successfully updated',
    type: GetBillDTO,
  })
  @ApiNotFoundResponse({
    description: 'The bill not found',
  })
  @ApiNotFoundResponse({
    description: 'The Category Bill not found',
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @GetLoggedUser() user_id: string,
    @Param('id') id: string,
    @Body() data: UpdateBillDTO,
  ) {
    return await this.updateBillUseCase.execute({
      id,
      user_id,
      data,
    });
  }
}
