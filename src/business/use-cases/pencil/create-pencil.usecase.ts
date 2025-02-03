import { CreatePencilDTO } from '@business/dtos/pencil';
import { IPencilRepository, PENSIL_REPOSITORY } from '@domain/repositories';
import { Inject } from '@nestjs/common';
import { ILoggerWrapper, LOGGER_SERVICE } from 'src/infrastructure/logging';

export class CreatePencilUseCase {
  constructor(
    @Inject(PENSIL_REPOSITORY) private pencilRepository: IPencilRepository,
    @Inject(LOGGER_SERVICE) private logger: ILoggerWrapper,
  ) {}

  async execute(data: CreatePencilDTO) {
    this.logger.logInfo(`${this.constructor.name} - Executing...`);
    const result = await this.pencilRepository.create(data);
    this.logger.logInfo(`${this.constructor.name} - Finished`);

    return result;
  }
}
