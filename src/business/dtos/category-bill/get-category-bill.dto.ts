import { ApiProperty } from '@nestjs/swagger';

export class GetCategoryBillDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'Category name' })
  name: string;

  @ApiProperty({ example: 'Category description' })
  description: string;

  @ApiProperty({ example: '#FFFFFF' })
  color: string;

  @ApiProperty({ example: 'icon-name' })
  icon: string;

  @ApiProperty({ example: '2025-02-09T12:34:56.789Z' })
  created_at: Date;

  @ApiProperty({ example: '2025-02-09T12:34:56.789Z' })
  updated_at: Date;
}
