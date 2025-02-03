import { GetAllPencilsUseCase } from '@business/use-cases/pencil/get-all-pencils.usecase';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller({ path: 'pencil', version: '1' })
export class PencilController {
  constructor(private readonly getAllPencilsUseCase: GetAllPencilsUseCase) {}
  @Get()
  @ApiOperation({ summary: 'Get all pencils' })
  @ApiResponse({ status: 200, description: 'Return all pencils' })

  findAll(): Promise<any> {
    return this.getAllPencilsUseCase.execute();
  }
}
