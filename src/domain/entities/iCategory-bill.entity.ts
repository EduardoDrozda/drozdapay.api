import { IBaseEntity } from './iBase.entity';

export interface ICategoryBillEntity extends IBaseEntity {
  name: string;
  description: string;
  color: string;
  icon: string;
}

export type CategoryBillCreateInput = Omit<
  ICategoryBillEntity,
  'id' | 'created_at' | 'updated_at'
>;
