import { ApiProperty } from '@nestjs/swagger';

export class BankAccountResponseDto {
  @ApiProperty({ example: '01902754' })
  accountNumber: string;

  @ApiProperty({ example: '10-10-10' })
  sortCode: string;

  @ApiProperty({ example: 'Savings Account' })
  name: string;

  @ApiProperty({ example: 'personal' })
  accountType: string;

  @ApiProperty({ example: 0.00 })
  balance: number;

  @ApiProperty({ example: 'GBP' })
  currency: string;

  @ApiProperty({ example: '2025-07-31T14:15:50.796Z' })
  createdTimestamp: Date;

  @ApiProperty({ example: '2025-07-31T14:15:50.796Z' })
  updatedTimestamp: Date;

  constructor(partial: Partial<BankAccountResponseDto>) {
    Object.assign(this, partial);
  }
}
