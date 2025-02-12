import { IBaseEntity } from './iBase.entity';

export interface IUserEntity extends IBaseEntity {
  name: string;
  email: string;
  password: string;
}

export type CreateUserInput = Omit<
  IUserEntity,
  'id' | 'created_at' | 'updated_at'
>;
