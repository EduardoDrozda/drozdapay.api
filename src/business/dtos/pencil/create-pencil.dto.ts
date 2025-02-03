import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePencilDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Pencil name' })  
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Pencil description' })
  description: string;
}
