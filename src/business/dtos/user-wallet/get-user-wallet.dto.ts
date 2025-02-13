import { ApiProperty } from "@nestjs/swagger";

export class GetUserWalletDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  user_id: string;

  @ApiProperty({ example: 'Wallet 1' })
  name: string;

  @ApiProperty({ example: 100.0 })
  balance: number;

  @ApiProperty({ example: '2025-02-09T12:34:56.789Z' })
  created_at: Date;

  @ApiProperty({ example: '2025-02-09T12:34:56.789Z' })
  updated_at: Date;
}