import { IBaseEntity } from './iBase.entity';

export interface IUserWalletEntity extends IBaseEntity {
  user_id: string;
  name: string;
  balance: number;
}

export type UserWalletCreateInput = Omit<
  IUserWalletEntity,
  'id' | 'created_at' | 'updated_at'
>;
