import { EnviromentModule } from '@enviroment/enviroment.module';
import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AuthenticationModule } from '@infrastructure/authentication';


@Module({
  imports: [
    EnviromentModule,
    ApiModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
