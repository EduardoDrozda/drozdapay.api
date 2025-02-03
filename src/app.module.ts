import { EnviromentModule } from '@enviroment/enviroment.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ApiModule } from './api/api.module';
import { UseCaseModule } from '@business/use-cases/use-case.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';


@Module({
  imports: [
    EnviromentModule,
    InfrastructureModule,
    ApiModule,
    UseCaseModule,
    RepositoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
