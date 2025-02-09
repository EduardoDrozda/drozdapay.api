import { CreateUserDTO } from '@business/dtos';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '@domain/repositories/iUser.repository';
import { Inject, Injectable } from '@nestjs/common';
import { HASH_SERVICE, IHashService } from 'src/infrastructure/hash';
import { ILoggerWrapper, LOGGER_SERVICE } from 'src/infrastructure/logging';

import {
  INotification,
  NOTIFICATION_SERVICE,
} from 'src/infrastructure/notification';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotification,
    @Inject(LOGGER_SERVICE) private logger: ILoggerWrapper,
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(HASH_SERVICE) private readonly hashService: IHashService,
  ) {}

  async execute(data: CreateUserDTO): Promise<void> {
    this.logger.logInfo(`${this.constructor.name} - Executing...`);

    const findedUser = await this.userRepository.findByEmail(data.email);

    if (findedUser) {
      this.notificationService.add('User already exists');

      return;
    }

    const newUser = {
      ...data,
      password: await this.hashService.hash(data.password),
    };

    await this.userRepository.create(newUser);
  }
}
