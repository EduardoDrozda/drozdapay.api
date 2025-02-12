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
    bills: {
      id: string;
      user_id: string;
      category_bills_id: string;
      name: string;
      description: string;
      totalValue: number;
      installments: number;
      installments_type: 'daily' | 'weekly' | 'monthly' | 'yearly';
      is_paid: boolean;
      created_at: Date;
      updated_at: Date;
    };
  }
}
