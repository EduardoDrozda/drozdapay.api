import { BILL_REPOSITORY, IBillRepository } from '@domain/repositories';
import { ILoggerWrapper, LOGGER_SERVICE } from '@infrastructure/logging';
import { INotification, NOTIFICATION_SERVICE } from '@infrastructure/notification';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetBillUseCase {
  constructor(
    @Inject(LOGGER_SERVICE) private readonly logger: ILoggerWrapper,
    @Inject(BILL_REPOSITORY)
    private readonly billRepository: IBillRepository,
  ) {}

  async execute(userId: string): Promise<any | void> {
    this.logger.logInfo(
      `${this.constructor.name} - Executing to: ${userId} `,
    );

    return this.billRepository.findAllByUserId(userId);
  }
}
