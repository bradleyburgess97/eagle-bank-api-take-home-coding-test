import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum AccountTypeEnum {
  PERSONAL = 'personal',
}

export class CreateAccountDto {
  @ApiProperty({ example: 'Savings Account' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'personal', enum: ['personal'] })
  @IsEnum(AccountTypeEnum)
  accountType: AccountTypeEnum;
}
