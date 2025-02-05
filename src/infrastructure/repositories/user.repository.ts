import { ICreateUserInput, UserEntity } from '@domain/entities';
import { IUserRepository } from '@domain/repositories/iUser.repository';
import { Knex } from 'knex';
import { knex } from '../database';

export class UserRepository implements IUserRepository {
  constructor(private readonly database: Knex = knex) {}

  async create(data: ICreateUserInput): Promise<UserEntity> {
    const user = new UserEntity(
      data.name,
      data.email.toLocaleLowerCase(),
      data.password,
    );

    const [result] = await this.database
      .table('users')
      .insert(user)
      .returning('*');

    return { ...result };
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.database
      .table('users')
      .where('email', email.toLocaleLowerCase())
      .first();
  }
}
