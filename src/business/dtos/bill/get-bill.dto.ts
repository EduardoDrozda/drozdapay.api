import { ApiProperty } from '@nestjs/swagger';

export class GetBillDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'Nome da conta' })
  name: string;

  @ApiProperty({ example: 150.75 })
  totalValue: number;

  @ApiProperty({ example: false })
  is_paid: boolean;

  @ApiProperty({ example: 'Descrição da conta', required: false })
  description?: string;

  @ApiProperty({ example: 5 })
  installments: number;

  @ApiProperty({ example: 'monthly' })
  installmentsType?: 'daily' | 'weekly' | 'monthly' | 'yearly';

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  user_id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
  category_bills_id: string;

  @ApiProperty({ example: '2025-02-09T12:34:56.789Z' })
  created_at: Date;

  @ApiProperty({ example: '2025-02-09T12:34:56.789Z' })
  updated_at?: Date;
}
