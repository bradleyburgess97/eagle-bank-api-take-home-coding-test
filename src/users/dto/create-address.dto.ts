import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  line1: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  line2?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  line3?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  town: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  county: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  postcode: string;
}