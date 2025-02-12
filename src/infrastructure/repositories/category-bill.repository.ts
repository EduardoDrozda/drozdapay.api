import {
  CategoryBillCreateInput,
  ICategoryBillEntity,
} from '@domain/entities/iCategory-bill.entity';
import { ICategoryBillRepository } from '@domain/repositories';
import { knex } from '@infrastructure/database';
import { Knex } from 'knex';

export class CategoryBillRepository implements ICategoryBillRepository {
  constructor(private readonly datatable: Knex = knex) {}

  async create(data: CategoryBillCreateInput): Promise<ICategoryBillEntity> {
    const [result] = await this.datatable('category_bills')
      .insert(data)
      .returning('*');

    return result;
  }

  findAll(filter?: string): Promise<ICategoryBillEntity[]> {
    if (filter) {
      return this.datatable('category_bills')
        .where('name', 'like', `%${filter}%`)
        .orWhere('description', 'like', `%${filter}%`)
        .select('*');
    }

    return this.datatable('category_bills').select('*');
  }

  findById(id: string): Promise<ICategoryBillEntity | undefined> {
    return this.datatable('category_bills').where('id', id).first();
  }
}
