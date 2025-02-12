import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env-schema.config';
import { ENVIROMENT_SERVICE } from './iEnviroment.service';
import { EnviromentService } from './enviroment.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: ENVIROMENT_SERVICE,
      useClass: EnviromentService,
    },
  ],
  exports: [ConfigModule, ENVIROMENT_SERVICE],
})
export class EnviromentModule {}
