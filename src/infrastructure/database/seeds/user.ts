import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  await knex('users').insert([
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Dummy user',
      email: 'email@email.com',
      password: '$2b$10$onVb9ZxRO4JqqjpGG36oceuA.2b1zmOlQyLXgrOAJAZRFMs4YAWCi',
    },
  ]);
}
