import { IBillEntity, BillCreateInput, BillUpdateInput } from "@domain/entities";

export const BILL_REPOSITORY = Symbol('IBillRepository');

export interface IBillRepository {
  create(data: BillCreateInput): Promise<IBillEntity>;
  findAllByUserId(user_id: string): Promise<IBillEntity[]>;
  findByIdAndUserId(id: string, user_idd: string): Promise<IBillEntity | null>;
  updateByUserId(id: string, user_idId: string, data: BillUpdateInput): Promise<IBillEntity>;
}