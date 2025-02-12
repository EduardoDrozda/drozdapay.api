import {
  CreateBillDTO,
  CreateCategoryBillDTO,
  GetBillDTO,
} from '@business/dtos';
import { CreateBillUseCase } from '@business/use-cases/bill/create-bill.usecase';
import { GetLoggedUser } from '@infrastructure/authentication';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller({ path: 'bills', version: '1' })
export class BillController {
  constructor(private readonly createBillUseCase: CreateBillUseCase) {}

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
}
