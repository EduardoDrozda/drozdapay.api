import { CreateUserWalletDTO } from '@business/dtos/user-wallet';
import {
  IUserWalletRepository,
  USER_WALLET_REPOSITORY,
} from '@domain/repositories';
import { ILoggerWrapper, LOGGER_SERVICE } from '@infrastructure/logging';
import {
  INotification,
  NOTIFICATION_SERVICE,
} from '@infrastructure/notification';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserWalletUseCase {
  constructor(
    @Inject(LOGGER_SERVICE) private readonly logger: ILoggerWrapper,
    @Inject(USER_WALLET_REPOSITORY)
    private readonly userWalletRepository: IUserWalletRepository,
  ) {}

  async execute(data: CreateUserWalletDTO) {
    this.logger.logInfo(
      `${this.constructor.name} - Executing to: ${JSON.stringify(data)} `,
    );

    return await this.userWalletRepository.create({
      user_id: data.user_id,
      name: data.name,
      balance: data.balance,
    });
  }
}
