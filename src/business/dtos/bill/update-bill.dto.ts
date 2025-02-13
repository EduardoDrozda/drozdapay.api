import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateBillDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Nome da conta' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 150.75 })
  total_value: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 5 })
  installments: number;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(['daily', 'weekly', 'monthly', 'yearly'])
  @ApiProperty({ example: 'monthly', required: false })
  installments_type: 'daily' | 'weekly' | 'monthly' | 'yearly';

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  category_bills_id: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Descrição da conta', required: false })
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: false, required: false })
  is_paid: boolean;

  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2025-04-05T03:00:00.000Z' })
  due_date?: string;
}
