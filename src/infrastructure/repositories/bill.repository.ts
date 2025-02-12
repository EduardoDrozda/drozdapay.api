import { BillCreateInput, IBillEntity } from '@domain/entities';
import { IBillRepository } from '@domain/repositories';
import { knex } from '@infrastructure/database';
import { Knex } from 'knex';

export class BillRepository implements IBillRepository {
  constructor(private readonly database: Knex = knex) {}

  async create(data: BillCreateInput): Promise<IBillEntity> {
    const [result] = await this.database('bills')
      .insert(data)
      .returning('*');

    return result;
  }

  findAllByUserId(userId: string): Promise<IBillEntity[]> {
    return this.database('bills').where({ user_id: userId }).select('*');
  }
}
