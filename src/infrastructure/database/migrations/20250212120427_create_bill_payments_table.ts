import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('bill_payments', table => {
    table
      .uuid('id', { primaryKey: true, useBinaryUuid: true })
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('value').notNullable();
    table.uuid('bill_id').notNullable();
    table.uuid('user_id').notNullable();
    table.bigint('installment').notNullable().defaultTo(1);
    table.date('payment_date');
    table.date('due_date').notNullable();
    table.timestamps(true, true);

    table.foreign('bill_id').references('id').inTable('bills').onDelete('CASCADE');
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('bill_payments');
}

