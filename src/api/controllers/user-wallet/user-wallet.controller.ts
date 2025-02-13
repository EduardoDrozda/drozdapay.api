import {
  CreateUserWalletDTO,
  GetUserWalletDTO,
} from '@business/dtos/user-wallet';
import { CreateUserWalletUseCase } from '@business/use-cases/user-wallet/create-user-wallet.usecase';
import { GetLoggedUser } from '@infrastructure/authentication';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller({ path: 'user-wallets', version: '1' })
export class UserWalletController {
  constructor(
    private readonly createUserWalletUseCase: CreateUserWalletUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create one user wallet',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/CreateUserWalletDTO',
          },
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'The category bill has been successfully created',
    type: GetUserWalletDTO,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @GetLoggedUser() userId: string,
    @Body() data: CreateUserWalletDTO,
  ) {
    return await this.createUserWalletUseCase.execute({
      ...data,
      user_id: userId,
    });
  }
}
