import { Global, Module } from '@nestjs/common';
import { PencilController } from './controllers';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  BaseRequestInterceptor,
  BaseResponseInterceptor,
} from 'src/infrastructure/interceptors';
import { UserController } from './controllers/user';
import { UseCaseModule } from '@business/use-cases/use-case.module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [UseCaseModule, InfrastructureModule],
  controllers: [PencilController, UserController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: BaseRequestInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: BaseResponseInterceptor,
    },
  ],
})
export class ApiModule {}
