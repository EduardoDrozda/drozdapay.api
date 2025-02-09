import { randomUUID } from 'node:crypto';

export class BaseEntity {
  id: string;
  created_at: Date;
  updated_at: Date;

  constructor() {
    this.id = randomUUID();
  }
}
