import { IPencilEntity } from '../entities/pencil.entity';

export const PENSIL_REPOSITORY = Symbol('PENSIL_REPOSITORY');

export interface IPencilRepository {
  findAll(): Promise<IPencilEntity[]>;
}
