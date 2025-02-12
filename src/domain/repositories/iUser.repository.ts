import { CreateUserInput, IUserEntity } from '@domain/entities';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository {
  create(data: CreateUserInput): Promise<IUserEntity>;
  findByEmail(email: string): Promise<IUserEntity | null>;
}
