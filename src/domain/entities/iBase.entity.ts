import { randomUUID } from 'node:crypto';

export interface IBaseEntity {
  id: string;
  created_at: Date;
  updated_at?: Date;
}
