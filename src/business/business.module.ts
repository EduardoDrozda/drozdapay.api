import { Global, Module } from '@nestjs/common';
import { UseCaseModule } from './use-cases/use-case.module';

@Global()
@Module({
  imports: [UseCaseModule],
})
export class BusinessModule {}
