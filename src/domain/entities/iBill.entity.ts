import { IBaseEntity } from './iBase.entity';

export interface IBillEntity extends IBaseEntity {
  name: string;
  totalValue: number;
  installments: number;
  installmentsType?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  is_paid: boolean;
  description?: string;
  user_id: string;
  category_bills_id: string;
}

export type BillCreateInput = Omit<
  IBillEntity,
  'id' | 'created_at' | 'updated_at'
>;
