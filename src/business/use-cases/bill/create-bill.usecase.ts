import { CreateBillDTO, GetBillDTO } from '@business/dtos';
import { BillCreateInput } from '@domain/entities';
import { BillPaymentCreateInput } from '@domain/entities/iBill-payment.entity';
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
import { DateHelper } from '@shared/helpers';

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

  async execute(data: CreateBillDTO): Promise<any | void> {
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

    const bill: BillCreateInput = {
      ...data,
      bill_payments: this.createBillInstallments(data),
    };

    return this.billRepository.create(bill);
  }

  private createBillInstallments(
    data: CreateBillDTO,
  ): BillPaymentCreateInput[] {
    const { installments, installments_type } = data;
    const installs: BillPaymentCreateInput[] = [];

    const quantity_installments = installments || 1;
    const valuePerInstallment = data.total_value / quantity_installments;
    const payment_frequency = installments_type || 'monthly';

    for (let i = 0; i < quantity_installments; i++) {
      const intallment = i + 1;
      const installment: BillPaymentCreateInput = {
        installment: intallment,
        user_id: data.user_id,
        value: valuePerInstallment.toFixed(2),
        due_date: DateHelper.addDate(new Date(), intallment, payment_frequency),
        payment_date: undefined,
      };

      installs.push(installment);
    }

    return installs;
  }
}
