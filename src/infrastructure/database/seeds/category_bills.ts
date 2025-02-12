import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('category_bills').del();

  await knex('category_bills').insert([
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Alimentação',
      description:
        'Despesas mensais com alimentação, incluindo compras de supermercado e refeições fora',
      color: '#FF5733',
      icon: 'food-icon',
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174001',
      name: 'Transporte',
      description:
        'Gastos com transporte, como combustível, passagens de ônibus e manutenção do carro',
      color: '#33FF57',
      icon: 'transport-icon',
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174002',
      name: 'Lazer',
      description:
        'Despesas com atividades de lazer, como cinema, shows e viagens',
      color: '#3357FF',
      icon: 'leisure-icon',
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174003',
      name: 'Educação',
      description:
        'Gastos com educação, incluindo mensalidades escolares, cursos e materiais didáticos',
      color: '#FF33A1',
      icon: 'education-icon',
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174004',
      name: 'Saúde',
      description:
        'Despesas com saúde, como consultas médicas, medicamentos e planos de saúde',
      color: '#33FFA1',
      icon: 'health-icon',
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174005',
      name: 'Moradia',
      description:
        'Gastos com moradia, incluindo aluguel, condomínio e contas de água e luz, eletrodomésticos',
      color: '#FF5733',
      icon: 'housing-icon',
    }
  ]);
}
