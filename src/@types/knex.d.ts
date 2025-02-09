import { IPencilEntity } from '@domain/entities';
import 'knex';

declare module 'knex/types/tables' {
  interface Tables {
    users: {
      id: string;
      name: string;
      email: string;
      password: string;
      created_at: Date;
      updated_at: Date;
    };
    category_bills: {
      id: string;
      name: string;
      description: string;
      color: string;
      icon: string;
      created_at: Date;
      updated_at: Date;
    };
  }
}
