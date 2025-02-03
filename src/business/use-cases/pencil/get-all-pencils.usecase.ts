import { Inject, Injectable } from '@nestjs/common';
import { IPencilRepository, PENSIL_REPOSITORY } from '@domain/repositories';
import { ILoggerWrapper, LOGGER_SERVICE } from 'src/infrastructure/logging';
import { INotification, NOTIFICATION_SERVICE } from 'src/infrastructure/notification';

@Injectable()
export class GetAllPencilsUseCase {
  constructor(
    @Inject(PENSIL_REPOSITORY) private pencilRepository: IPencilRepository,
    @Inject(LOGGER_SERVICE) private logger: ILoggerWrapper
  ) {}

  async execute() {
    this.logger.logInfo(`${this.constructor.name} - Executing...`);
    const result = await this.pencilRepository.findAll();
    this.logger.logInfo(`${this.constructor.name} - Finished`);

    return result;
  }
}
