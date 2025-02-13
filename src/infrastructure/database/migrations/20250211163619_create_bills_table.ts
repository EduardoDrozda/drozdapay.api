import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('bills', (table) => {
    table
      .uuid('id', { primaryKey: true, useBinaryUuid: true })
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name').notNullable();
    table.string('description');

    table.decimal('total_value').notNullable();

    table.bigInteger('installments').notNullable().defaultTo(1);
    table.enum('installments_type', ['daily', 'weekly', 'monthly', 'yearly']).defaultTo('monthly');

    table.uuid('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('users');

    table.uuid('category_bills_id').notNullable();

    table.boolean('is_paid').defaultTo(false);

    table
      .foreign('category_bills_id')
      .references('id')
      .inTable('category_bills')
      .onDelete('CASCADE');

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('bills');
}
