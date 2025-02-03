import { IPencilEntity } from '@domain/entities';
import { IPencilRepository } from '@domain/repositories';


export class PencilRepository implements IPencilRepository {
  async findAll(): Promise<IPencilEntity[]> {
    return [];
  }
}
