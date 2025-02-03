import { BaseEntity } from './base.entity';

export class PencilEntity extends BaseEntity {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    super();
    this.name = name;
    this.description = description;
  }
}

export interface ICreatePencilInput {
  name: string;
  description: string;
}
