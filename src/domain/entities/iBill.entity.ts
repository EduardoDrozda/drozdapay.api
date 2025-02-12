import { IBaseEntity } from './iBase.entity';
import { BillPaymentCreateInput, IBillPaymentEntity } from './iBill-payment.entity';

export interface IBillEntity extends IBaseEntity {
  name: string;
  total_value: number;
  installments: number;
  installmentsType?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  is_paid: boolean;
  description?: string;
  user_id: string;
  category_bills_id: string;
  bill_payments: IBillPaymentEntity[];
}

export type BillCreateInput = Omit<
  IBillEntity,
  'id' | 'created_at' | 'updated_at' | 'bill_payments'
> & {
  bill_payments: BillPaymentCreateInput[];
}
