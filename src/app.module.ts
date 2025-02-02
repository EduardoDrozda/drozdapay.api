import { EnviromentModule } from '@enviroment/enviroment.module';
import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [EnviromentModule, InfrastructureModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
