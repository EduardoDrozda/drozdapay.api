import { ICreateUserInput, UserEntity } from '@domain/entities';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository {
  create(data: ICreateUserInput): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
