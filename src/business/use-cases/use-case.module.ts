import { Module } from '@nestjs/common';
import { USER_USECASES } from './user';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { LOGIN_USE_CASES } from './auth';
import { CATEGORY_BILL_USE_CASES } from './category-bill';
import { BILL_USE_CASES } from './bill';

@Module({
  imports: [InfrastructureModule],
  providers: [
    ...USER_USECASES,
    ...LOGIN_USE_CASES,
    ...CATEGORY_BILL_USE_CASES,
    ...BILL_USE_CASES,
  ],
  exports: [
    ...USER_USECASES,
    ...LOGIN_USE_CASES,
    ...CATEGORY_BILL_USE_CASES,
    ...BILL_USE_CASES,
  ],
})
export class UseCaseModule {}
