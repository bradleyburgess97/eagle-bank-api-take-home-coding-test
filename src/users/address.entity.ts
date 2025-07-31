import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column()
  @ApiProperty({ example: '123 Example Street' })
  line1: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Apt 4B', required: false })
  line2: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Building 7', required: false })
  line3: string;

  @Column()
  @ApiProperty({ example: 'London' })
  town: string;

  @Column()
  @ApiProperty({ example: 'Greater London' })
  county: string;

  @Column()
  @ApiProperty({ example: 'SW5 5AL' })
  postcode: string;
}
