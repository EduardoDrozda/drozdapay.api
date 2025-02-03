import { CreatePencilDTO, GetPencilDTO } from '@business/dtos/pencil';
import { CreatePencilUseCase } from '@business/use-cases/pencil/create-pencil.usecase';
import { GetAllPencilsUseCase } from '@business/use-cases/pencil/get-all-pencils.usecase';
import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller({ path: 'pencil', version: '1' })
export class PencilController {
  constructor(
    private readonly getAllPencilsUseCase: GetAllPencilsUseCase,
    private readonly createPencilUseCase: CreatePencilUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all pencils' })
  @ApiResponse({
    status: 200,
    description: 'Return all pencils',
    type: GetPencilDTO,
    isArray: true,
  })
  findAll(): Promise<any> {
    return this.getAllPencilsUseCase.execute();
  }

  @Post()
  @ApiOperation({
    summary: 'Create a pencil',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/CreatePencilDTO',
          },
        },
      },
    }
  })
  @ApiResponse({
    status: 201,
    description: 'The pencil has been successfully created',
    type: GetPencilDTO,
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPencilDto: CreatePencilDTO): Promise<any> {
    return this.createPencilUseCase.execute(createPencilDto);
  }
}
