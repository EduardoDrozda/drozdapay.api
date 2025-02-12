import { CreateBillDTO, GetBillDTO } from '@business/dtos';
import {
  BILL_REPOSITORY,
  CATEGORY_BILL_REPOSITORY,
  IBillRepository,
  ICategoryBillRepository,
} from '@domain/repositories';
import { ILoggerWrapper, LOGGER_SERVICE } from '@infrastructure/logging';
import {
  INotification,
  NOTIFICATION_SERVICE,
} from '@infrastructure/notification';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateBillUseCase {
  constructor(
    @Inject(LOGGER_SERVICE) private readonly logger: ILoggerWrapper,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotification,
    @Inject(BILL_REPOSITORY)
    private readonly billRepository: IBillRepository,
    @Inject(CATEGORY_BILL_REPOSITORY)
    private readonly categoryBillRepository: ICategoryBillRepository,
  ) {}

  async execute(data: CreateBillDTO): Promise<GetBillDTO | void> {
    this.logger.logInfo(
      `${this.constructor.name} - Executing to: ${JSON.stringify(data)} `,
    );

    const { category_bills_id } = data;

    const categoryBill =
      await this.categoryBillRepository.findById(category_bills_id);

    if (!categoryBill) {
      const message = `${this.constructor.name} - CategoryBill not found: ${category_bills_id}`;
      this.logger.logError(message);
      this.notificationService.add(message, HttpStatus.BAD_REQUEST);
      return;
    }

    return this.billRepository.create(data);
  }
}
