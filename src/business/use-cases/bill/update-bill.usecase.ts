import { GetBillDTO, UpdateBillDTO } from '@business/dtos';
import { BillUpdateInput } from '@domain/entities';
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

interface UpdateBillUseCaseParams {
  id: string;
  user_id: string;
  data: UpdateBillDTO;
}

@Injectable()
export class UpdateBillUseCase {
  constructor(
    @Inject(LOGGER_SERVICE) private readonly logger: ILoggerWrapper,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotification,
    @Inject(BILL_REPOSITORY)
    private readonly billRepository: IBillRepository,
    @Inject(CATEGORY_BILL_REPOSITORY)
    private readonly categoryBillRepository: ICategoryBillRepository,
  ) {}

  async execute({ id, user_id, data }: UpdateBillUseCaseParams) {
    this.logger.logInfo(
      `${this.constructor.name} - Executing to: ${user_id} with data: ${JSON.stringify(data)}`,
    );

    try {
      const bill = await this.billRepository.findByIdAndUserId(id, user_id);

      if (!bill) {
        const message = `${this.constructor.name} - Bill not found`;
        this.logger.logError(message);
        this.notificationService.add(message, HttpStatus.NOT_FOUND);
        return;
      }

      const category = await this.categoryBillRepository.findById(
        data.category_bills_id,
      );

      if (!category) {
        const message = `${this.constructor.name} - Category not found`;
        this.logger.logError(message);
        this.notificationService.add(message, HttpStatus.NOT_FOUND);
        return;
      }

      const billPayments = this.createBillInstallments({
        id,
        user_id,
        data,
      });

      return await this.billRepository.updateByUserId(id, user_id, {
        ...data,
        bill_payments: billPayments,
      });
    } catch (error) {
      const message = `${this.constructor.name} - Error: ${error.message}`;
      this.logger.logError(message);
      this.notificationService.add(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private createBillInstallments({
    id,
    user_id,
    data,
  }: UpdateBillUseCaseParams): BillPaymentCreateInput[] {
    const { installments, installments_type, due_date } = data;
    const installs: BillPaymentCreateInput[] = [];

    const quantity_installments = installments || 1;
    const valuePerInstallment = data.total_value / quantity_installments;
    const payment_frequency = installments_type || 'monthly';

    let firstDueDate = new Date();

    if (due_date) {
      firstDueDate = DateHelper.removeTime(
        new Date(due_date),
        1,
        payment_frequency,
      );
    }

    for (let i = 0; i < quantity_installments; i++) {
      const installment = i + 1;

      const billInstallment: BillPaymentCreateInput = {
        bill_id: id,
        installment,
        user_id,
        due_date: DateHelper.addDate(
          firstDueDate,
          installment,
          payment_frequency,
        ),
        value: valuePerInstallment.toFixed(2),
      };

      installs.push(billInstallment);
    }

    return installs;
  }
}
