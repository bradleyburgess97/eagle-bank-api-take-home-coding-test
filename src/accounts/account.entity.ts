import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export type AccountType = 'personal';
export type Currency = 'GBP';

@Entity({ name: 'bank_accounts' })
export class BankAccount {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: '01234567', description: 'Account number matching ^01\\d{6}$' })
  accountNumber: string;

  @Column()
  @ApiProperty({ example: '10-10-10' })
  sortCode: string;

  @Column()
  @ApiProperty({ example: 'Main Checking Account' })
  name: string;

  @Column({ type: 'enum', enum: ['personal'] })
  @ApiProperty({ example: 'personal' })
  accountType: AccountType;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  @ApiProperty({ example: 0.0 })
  balance: number;

  @Column({ type: 'enum', enum: ['GBP'], default: 'GBP' })
  @ApiProperty({ example: 'GBP' })
  currency: Currency;

  @ManyToOne(() => User, (user) => user.bankAccounts)
  user: User;

  @CreateDateColumn({ name: 'created_timestamp', type: 'timestamp with time zone' })
  @ApiProperty({ example: '2025-07-31T13:00:00.000Z' })
  createdTimestamp: Date;

  @UpdateDateColumn({ name: 'updated_timestamp', type: 'timestamp with time zone' })
  @ApiProperty({ example: '2025-07-31T13:05:00.000Z' })
  updatedTimestamp: Date;
}
