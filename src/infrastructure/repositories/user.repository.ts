import { CreateUserInput, IUserEntity } from '@domain/entities';
import { IUserRepository } from '@domain/repositories/iUser.repository';
import { Knex } from 'knex';
import { knex } from '../database';

export class UserRepository implements IUserRepository {
  constructor(private readonly database: Knex = knex) {}

  async create(data: CreateUserInput): Promise<IUserEntity> {
    data = {
      ...data,
      email: data.email.toLocaleLowerCase(),
    };

    const [result] = await this.database
      .table('users')
      .insert(data)
      .returning('*');

    return { ...result };
  }

  findByEmail(email: string): Promise<IUserEntity | null> {
    return this.database
      .table('users')
      .where('email', email.toLocaleLowerCase())
      .first();
  }
}
