import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from '@domain/repositories/iUser.repository';
import { UserRepository } from './user.repository';
import { CATEGORY_BILL_REPOSITORY } from '@domain/repositories';
import { CategoryBillRepository } from './category-bill.repository';

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
  ],
  exports: [USER_REPOSITORY, CATEGORY_BILL_REPOSITORY],
})
export class RepositoriesModule {}
