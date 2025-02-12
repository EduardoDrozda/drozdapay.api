import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('category_bills', (table) => {
    table
      .uuid('id', { primaryKey: true, useBinaryUuid: true })
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name').notNullable();
    table.string('description').nullable();
    table.string('color').notNullable().defaultTo('#000000');
    table.string('icon');

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('category_bills');
}
