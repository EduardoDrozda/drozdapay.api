import { CreateAuthenticationDTO } from '@business/dtos';
import { CreateAuthenticationUseCase } from '@business/use-cases/auth/create-authentication.use-case';
import { IsPublic } from '@infrastructure/authentication';

import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller({ path: '', version: '1' })
export class AuthController {
  constructor(private readonly loginUseCase: CreateAuthenticationUseCase) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Email or password is incorrect',
  })
  login(@Body() data: CreateAuthenticationDTO) {
    return this.loginUseCase.execute(data);
  }
}
