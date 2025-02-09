import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import {
  BaseRequestInterceptor,
  BaseResponseInterceptor,
} from 'src/infrastructure/interceptors';
import { UserController } from './controllers/user';
import { UseCaseModule } from '@business/use-cases/use-case.module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { AuthGuard } from '@infrastructure/authentication';
import { RequestExceptionFilter } from '@infrastructure/filters/exception';
import { CategoryBillController } from './controllers/category-bill';

@Module({
  imports: [UseCaseModule, InfrastructureModule],
  controllers: [UserController, AuthController, CategoryBillController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: BaseRequestInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: BaseResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: RequestExceptionFilter,
    },
  ],
})
export class ApiModule {}
