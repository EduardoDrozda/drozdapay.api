import { ApiProperty } from "@nestjs/swagger";

export class GetBillPaymentDTO {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Number })
  value: string;

  @ApiProperty({ type: String })
  bill_id: string;

  @ApiProperty({ type: String })
  user_id: string;

  @ApiProperty({ type: Number })
  installment: number;

  @ApiProperty({ type: Date })
  payment_date: Date;

  @ApiProperty({ type: Date })
  due_date: Date;

  @ApiProperty({ type: Date })
  created_at: Date;

  @ApiProperty({ type: Date })
  updated_at: Date;
}