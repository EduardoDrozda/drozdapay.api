import { BillCreateInput, IBillEntity } from '@domain/entities';
import { IBillRepository } from '@domain/repositories';
import { knex } from '@infrastructure/database';
import { Knex } from 'knex';

export class BillRepository implements IBillRepository {
  constructor(private readonly database: Knex = knex) {}

  async create(data: BillCreateInput): Promise<IBillEntity> {
    return this.database.transaction(async (trx) => {
      const [insertedBill] = await trx('bills')
        .insert({
          name: data.name,
          total_value: data.total_value,
          installments: data.installments,
          installments_type: data.installmentsType,
          user_id: data.user_id,
          category_bills_id: data.category_bills_id,
          description: data.description,
          is_paid: data.is_paid,
        })
        .returning('*');

      const { bill_payments } = data;

      const payments = await trx('bill_payments')
        .insert(
          bill_payments.map((payment) => ({
            ...payment,
            bill_id: insertedBill.id,
          })),
        )
        .returning('*');

      return {
        ...insertedBill,
        bill_payments: payments,
      };
    });
  }

  findAllByUserId(userId: string): Promise<IBillEntity[]> {
    return this.database('bills as b')
      .leftJoin('bill_payments as bp', 'b.id', 'bp.bill_id')
      .where('b.user_id', userId)
      .select('b.*', this.database.raw('json_agg(bp.*) as bill_payments'))
      .groupBy('b.id');
  }
}
