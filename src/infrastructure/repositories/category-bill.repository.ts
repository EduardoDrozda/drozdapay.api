import {
  ICategoryBillCreateInput,
  CategoryBillEntity,
} from '@domain/entities/category-bill.entity';
import { ICategoryBillRepository } from '@domain/repositories';
import { knex } from '@infrastructure/database';
import { Knex } from 'knex';

export class CategoryBillRepository implements ICategoryBillRepository {
  constructor(private readonly datatable: Knex = knex) {}

  async create(data: ICategoryBillCreateInput): Promise<CategoryBillEntity> {
    const payload = new CategoryBillEntity(
      data.name,
      data.description,
      data.color,
      data.icon,
    );

    const [result] = await this.datatable('category_bills')
      .insert(payload)
      .returning('*');

    return result;
  }

  findAll(filter?: string): Promise<CategoryBillEntity[]> {

    if (filter) {
      return this.datatable('category_bills')
        .where('name', 'like', `%${filter}%`)
        .orWhere('description', 'like', `%${filter}%`)
        .select('*');
    }

    return this.datatable('category_bills').select('*');
  }
}
