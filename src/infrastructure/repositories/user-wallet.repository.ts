import { UserWalletCreateInput, IUserWalletEntity } from '@domain/entities';
import { IUserWalletRepository } from '@domain/repositories';
import { knex } from '@infrastructure/database';
import { Knex } from 'knex';

export class UserWalletRepository implements IUserWalletRepository {
  constructor(private readonly database: Knex = knex) {}

  create(data: UserWalletCreateInput): Promise<IUserWalletEntity> {
    return this.database.transaction(async (trx) => {
      const [result] = await trx('user_wallets').insert(data).returning('*');
      return result;
    });
  }
}
