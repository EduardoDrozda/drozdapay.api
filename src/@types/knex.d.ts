import { IPencilEntity } from '@domain/entities';
import 'knex';

declare module 'knex/types/tables' {
  interface Tables {
    pencils: IPencilEntity;
  }
}
