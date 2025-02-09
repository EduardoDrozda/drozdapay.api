import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from '@domain/repositories/iUser.repository';
import { UserRepository } from './user.repository';

@Module({
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    }
  ],
  exports: [USER_REPOSITORY],
})
export class RepositoriesModule {}
