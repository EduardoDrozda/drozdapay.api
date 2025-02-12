import { IBillEntity, BillCreateInput } from "@domain/entities";

export const BILL_REPOSITORY = Symbol('IBillRepository');

export interface IBillRepository {
  create(data: BillCreateInput): Promise<IBillEntity>;
  findAllByUserId(userId: string): Promise<IBillEntity[]>;
}