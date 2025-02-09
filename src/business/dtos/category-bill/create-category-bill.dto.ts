import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryBillDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Category name' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Category description' })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '#FFFFFF' })
  color: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'icon-name' })
  icon: string;
}
