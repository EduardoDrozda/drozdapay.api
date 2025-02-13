import { Module } from '@nestjs/common';
import { USER_USECASES } from './user';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { LOGIN_USE_CASES } from './auth';
import { CATEGORY_BILL_USE_CASES } from './category-bill';
import { BILL_USE_CASES } from './bill';
import { USER_WALLET_USECASES } from './user-wallet';

@Module({
  imports: [InfrastructureModule],
  providers: [
    ...USER_USECASES,
    ...LOGIN_USE_CASES,
    ...CATEGORY_BILL_USE_CASES,
    ...BILL_USE_CASES,
    ...USER_WALLET_USECASES,
  ],
  exports: [
    ...USER_USECASES,
    ...LOGIN_USE_CASES,
    ...CATEGORY_BILL_USE_CASES,
    ...BILL_USE_CASES,
    ...USER_WALLET_USECASES,
  ],
})
export class UseCaseModule {}
