import { Global, Module } from '@nestjs/common';
import { PENCIL_USECASES } from './pencil';

@Global()
@Module({
  providers: [...PENCIL_USECASES],
  exports: [...PENCIL_USECASES],
})
export class UseCaseModule {}
