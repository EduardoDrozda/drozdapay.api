import { ApiProperty } from '@nestjs/swagger';

export class GetPencilDTO {
  @ApiProperty({ example: 'Pencil name' })
  name: string;

  @ApiProperty({ example: 'Pencil description' })
  description: string;
}
