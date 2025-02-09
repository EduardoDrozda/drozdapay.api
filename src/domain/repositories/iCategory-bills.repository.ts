import { CategoryBillEntity, ICategoryBillCreateInput } from "@domain/entities/category-bill.entity";

export const CATEGORY_BILL_REPOSITORY = Symbol('ICategoryBillRepository');

export interface ICategoryBillRepository {
  create(data: ICategoryBillCreateInput): Promise<CategoryBillEntity>;
  findAll(filter?: string): Promise<CategoryBillEntity[]>;
}