import { Injectable } from '@nestjs/common';
import { EnvTypes } from './env-schema.config';
import { ConfigService } from '@nestjs/config';
import { IEnvironmentService } from './iEnviroment.service';

@Injectable()
export class EnviromentService implements IEnvironmentService {
  constructor(private readonly configService: ConfigService<EnvTypes>) {}

  get(key: keyof EnvTypes): string | undefined {
    return this.configService.get(key);
  }
}
