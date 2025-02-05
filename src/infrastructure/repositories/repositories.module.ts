import { PENSIL_REPOSITORY } from '@domain/repositories';
import { Global, Module } from '@nestjs/common';
import { PencilRepository } from './pencil.repository';
import { USER_REPOSITORY } from '@domain/repositories/iUser.repository';
import { UserRepository } from './user.repository';

@Module({
  providers: [
    {
      provide: PENSIL_REPOSITORY,
      useClass: PencilRepository,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    }
  ],
  exports: [PENSIL_REPOSITORY, USER_REPOSITORY],
})
export class RepositoriesModule {}
