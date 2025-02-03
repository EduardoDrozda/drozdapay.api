import { ICreatePencilInput, PencilEntity } from '@domain/entities';
import { IPencilRepository } from '@domain/repositories';
import { Knex } from 'knex';
import { knex } from '../database';

export class PencilRepository implements IPencilRepository {
  constructor(private readonly database: Knex = knex) {}

  async findAll(): Promise<PencilEntity[]> {
    return this.database.table('pencils').select('*');
  }

  async create(pencil: ICreatePencilInput): Promise<PencilEntity> {
    const { name, description } = pencil;
    const data = new PencilEntity(name, description);

    const [result] = await this.database
      .table('pencils')
      .insert(data)
      .returning('*');

    return { ...result };
  }
}
