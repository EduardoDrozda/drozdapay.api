import {
  ENVIROMENT_SERVICE,
  IEnvironmentService,
} from '@enviroment/iEnviroment.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ILoggerWrapper,
  LOGGER_SERVICE,
} from './infrastructure/logging/iLogger-wrapper';

export class Application {
  private app: INestApplication;
  private logger: ILoggerWrapper;
  private enviromentService: IEnvironmentService;
  private globalPrefix = 'api';

  private async setApplication(): Promise<void> {
    this.app = await NestFactory.create(AppModule);
    this.enviromentService = this.app.get(ENVIROMENT_SERVICE);
    this.logger = this.app.get(LOGGER_SERVICE);
  }

  private async setGlobalScopes(): Promise<void> {
    this.app.setGlobalPrefix(this.globalPrefix);
    this.app.useGlobalPipes(new ValidationPipe());
  }

  private getPort(): string {
    return this.enviromentService.get('APP_PORT') || '3333';
  }

  async start(): Promise<void> {
    await this.setApplication();
    await this.setGlobalScopes();
    // await this.configSwagger();
    const port = this.getPort();

    await this.app
      .listen(port)
      .then(() => {
        this.logger.logInfo(`Application running on port ${port}`, 'NestApplication');
      })
      .catch((error) => {
        this.logger.logError(`Error starting application: ${error}`, 'NestApplication');
        process.exit(1);
      });
  }
}
