import { randomUUID } from 'node:crypto';

export class BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = randomUUID();
  }
}
