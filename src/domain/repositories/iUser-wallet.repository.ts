import { IUserWalletEntity, UserWalletCreateInput } from "@domain/entities";

export const USER_WALLET_REPOSITORY = Symbol('IUserWalletRepository');

export interface IUserWalletRepository {
  create(data: UserWalletCreateInput): Promise<IUserWalletEntity>;
}