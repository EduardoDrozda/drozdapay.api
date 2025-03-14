import { EnviromentModule } from '@enviroment/enviroment.module';
import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';

@Module({
  imports: [EnviromentModule, ApiModule],
})
export class AppModule { }
