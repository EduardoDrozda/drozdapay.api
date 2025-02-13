import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserWalletDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Wallet 1' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 100.0 })
  balance: number;

  user_id: string;
}
