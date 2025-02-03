import { PENSIL_REPOSITORY } from '@domain/repositories';
import { Global, Module } from '@nestjs/common';
import { PencilRepository } from './pencil.repository';

@Global()
@Module({
  providers: [
    {
      provide: PENSIL_REPOSITORY,
      useClass: PencilRepository,
    },
  ],
  exports: [PENSIL_REPOSITORY],
})
export class RepositoriesModule {}
