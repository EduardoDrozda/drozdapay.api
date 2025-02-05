import { Module } from '@nestjs/common';
import { PENCIL_USECASES } from './pencil';
import { USER_USECASES } from './user';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [...PENCIL_USECASES, ...USER_USECASES],
  exports: [...PENCIL_USECASES, ...USER_USECASES],
})
export class UseCaseModule {}
