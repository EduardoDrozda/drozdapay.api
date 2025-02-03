import { ICreatePencilInput, PencilEntity } from '../entities/pencil.entity';

export const PENSIL_REPOSITORY = Symbol('PENSIL_REPOSITORY');

export interface IPencilRepository {
  findAll(): Promise<PencilEntity[]>;
  create(pencil: ICreatePencilInput): Promise<PencilEntity>;
}
