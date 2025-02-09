import { CATEGORY_BILL_REPOSITORY, ICategoryBillRepository } from "@domain/repositories";
import { ILoggerWrapper, LOGGER_SERVICE } from "@infrastructure/logging";
import { INotification, NOTIFICATION_SERVICE } from "@infrastructure/notification";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class GetAllCategoryBillUseCase {
  constructor(
      @Inject(LOGGER_SERVICE) private readonly logger: ILoggerWrapper,
      @Inject(CATEGORY_BILL_REPOSITORY)
      private readonly categoryBillRepository: ICategoryBillRepository,
    ) {}

  async execute(filter?: string) {
    this.logger.logInfo(`${this.constructor.name} - Executing...`);
    return await this.categoryBillRepository.findAll(filter);
  }
}