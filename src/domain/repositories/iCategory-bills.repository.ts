import {
  ICategoryBillEntity,
  CategoryBillCreateInput,
} from '@domain/entities/iCategory-bill.entity';

export const CATEGORY_BILL_REPOSITORY = Symbol('ICategoryBillRepository');

export interface ICategoryBillRepository {
  create(data: CategoryBillCreateInput): Promise<ICategoryBillEntity>;
  findAll(filter?: string): Promise<ICategoryBillEntity[]>;
  findById(id: string): Promise<ICategoryBillEntity | undefined>;
}
