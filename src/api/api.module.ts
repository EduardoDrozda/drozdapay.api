import { Global, Module } from '@nestjs/common';
import { PencilController } from './controllers';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  BaseRequestInterceptor,
  BaseResponseInterceptor,
} from 'src/infrastructure/interceptors';

@Global()
@Module({
  controllers: [PencilController],
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
