import { CreateUserDTO } from '@business/dtos';
import { CreateUserUseCase } from '@business/use-cases/user/create-user.usecase';
import { IsPublic } from '@infrastructure/authentication';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @IsPublic()
  @Post()
  @ApiOperation({
    summary: 'Create a user',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/CreateUserDTO',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created',
    type: CreateUserDTO,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The user already exists',
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDTO: CreateUserDTO) {
    await this.createUserUseCase.execute(createUserDTO);
  }
}
