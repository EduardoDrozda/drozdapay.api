import {
  ENVIROMENT_SERVICE,
  IEnvironmentService,
} from '@enviroment/iEnviroment.service';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ILoggerWrapper, LOGGER_SERVICE } from './infrastructure/logging';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

    this.app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

    this.app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });
  }

  private async configSwagger(): Promise<void> {
    const nodeEnv = this.enviromentService.get('NODE_ENV');

    if (nodeEnv !== 'development') {
      return;
    }

    const config = new DocumentBuilder()
      .setTitle('Diet Helper')
      .setDescription('API documentation for Drozdapay')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(this.app, config);

    SwaggerModule.setup('swagger', this.app, document, {
      jsonDocumentUrl: 'swagger/json',
    });
  }

  private getPort(): string {
    return this.enviromentService.get('APP_PORT') || '3333';
  }

  async start(): Promise<void> {
    await this.setApplication();
    this.setGlobalScopes();
    this.configSwagger();
    const port = this.getPort();

    await this.app
      .listen(port)
      .then(() => {
        this.logger.logInfo(`${this.constructor.name} running on port ${port}`);
      })
      .catch((error) => {
        this.logger.logError(
          `${this.constructor.name} Error starting: ${error}`,
        );
        process.exit(1);
      });
  }
}
