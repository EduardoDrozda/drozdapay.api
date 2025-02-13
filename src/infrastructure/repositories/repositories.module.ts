import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from '@domain/repositories/iUser.repository';
import { UserRepository } from './user.repository';
import {
  BILL_REPOSITORY,
  CATEGORY_BILL_REPOSITORY,
  USER_WALLET_REPOSITORY,
} from '@domain/repositories';
import { CategoryBillRepository } from './category-bill.repository';
import { BillRepository } from './bill.repository';
import { UserWalletRepository } from './user-wallet.repository';

@Module({
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: CATEGORY_BILL_REPOSITORY,
      useClass: CategoryBillRepository,
    },
    {
      provide: BILL_REPOSITORY,
      useClass: BillRepository,
    },
    {
      provide: USER_WALLET_REPOSITORY,
      useClass: UserWalletRepository,
    },
  ],
  exports: [
    USER_REPOSITORY,
    CATEGORY_BILL_REPOSITORY,
    BILL_REPOSITORY,
    USER_WALLET_REPOSITORY,
  ],
})
export class RepositoriesModule {}
