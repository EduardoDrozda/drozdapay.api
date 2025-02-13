import { BILL_REPOSITORY, IBillRepository } from '@domain/repositories';
import { ILoggerWrapper, LOGGER_SERVICE } from '@infrastructure/logging';
import {
  INotification,
  NOTIFICATION_SERVICE,
} from '@infrastructure/notification';
import { HttpStatus, Inject } from '@nestjs/common';

export class GetByIdBillUseCase {
  constructor(
    @Inject(LOGGER_SERVICE) private readonly logger: ILoggerWrapper,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotification,
    @Inject(BILL_REPOSITORY)
    private readonly billRepository: IBillRepository,
  ) {}

  async execute(id: string, userId: string): Promise<any | void> {
    this.logger.logInfo(`${this.constructor.name} - Executing to: ${userId} with id: ${id}`);

    const bill = await this.billRepository.findByIdAndUserId(id, userId);

    if (!bill) {
      const message = `${this.constructor.name} - Bill not found`;
      this.logger.logError(message);
      this.notificationService.add(message, HttpStatus.NOT_FOUND);
      return;
    }

    return bill;
  }
}
