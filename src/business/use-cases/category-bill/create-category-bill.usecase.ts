import { CreateCategoryBillDTO, GetCategoryBillDTO } from '@business/dtos';
import {
  CATEGORY_BILL_REPOSITORY,
  ICategoryBillRepository,
} from '@domain/repositories';
import { ILoggerWrapper, LOGGER_SERVICE } from '@infrastructure/logging';
import {
  INotification,
  NOTIFICATION_SERVICE,
} from '@infrastructure/notification';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateCategoryBillUseCase {
  constructor(
    @Inject(LOGGER_SERVICE) private readonly logger: ILoggerWrapper,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotification,
    @Inject(CATEGORY_BILL_REPOSITORY)
    private readonly categoryBillRepository: ICategoryBillRepository,
  ) {}

  async execute(data: CreateCategoryBillDTO): Promise<GetCategoryBillDTO> {
    this.logger.logInfo(
      `${this.constructor.name} - Executing with data: ${data.name}`,
    );

    const categoryBill = await this.categoryBillRepository.create(data);

    return categoryBill;
  }
}
