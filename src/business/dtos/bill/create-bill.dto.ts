import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsNumberString,
  IsEnum,
  IsUUID,
  IsInt,
  IsDateString,
} from 'class-validator';

export class CreateBillDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Nome da conta' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Descrição da conta', required: false })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 150.75 })
  total_value: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 5 })
  @IsOptional()
  installments: number = 1;

  @IsNotEmpty()
  @IsEnum(['daily', 'weekly', 'monthly', 'yearly'])
  @IsOptional()
  @ApiProperty({ example: 'monthly', required: false })
  installments_type: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly';

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: false, required: false })
  is_paid: boolean;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  category_bills_id: string;

  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2025-04-05T03:00:00.000Z' })
  due_date?: string;

  user_id: string;
}
