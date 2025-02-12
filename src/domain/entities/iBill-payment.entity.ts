import { IBaseEntity } from './iBase.entity';
import { IBillEntity } from './iBill.entity';

export interface IBillPaymentEntity extends IBaseEntity {
  value: string;
  bill_id: string;
  user_id: string;
  installment: number;
  payment_date?: Date;
  due_date: Date;

  bill?: IBillEntity;
}

export type BillPaymentCreateInput = Omit<
  IBillPaymentEntity,
  'id' | 'created_at' | 'updated_at' | 'bill' | 'bill_id'
> & {
  bill_id?: string;
};
