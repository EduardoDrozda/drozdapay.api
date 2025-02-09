import { EnviromentModule } from '@enviroment/enviroment.module';
import { EnviromentService } from '@enviroment/enviroment.service';
import {
  ENVIROMENT_SERVICE,
  IEnvironmentService,
} from '@enviroment/iEnviroment.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_SERVICE } from './IAuthentication.service';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [EnviromentModule],
      inject: [ENVIROMENT_SERVICE],
      useFactory: (envService: IEnvironmentService) => ({
        secret: envService.get('JWT_SECRET'),
        signOptions: { expiresIn: envService.get('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: AuthenticationService,
    },
  ],
  exports: [JwtModule, AUTH_SERVICE],
})
export class AuthenticationModule {}
