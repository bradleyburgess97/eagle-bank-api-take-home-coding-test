import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';
import * as bcrypt from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column()
  @ApiProperty({ example: 'Test User' })
  name: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'test.user@example.com' })
  email: string;

  @Column()
  @ApiProperty({ example: '+447123456789' })
  phoneNumber: string;

  @Column()
  password: string; // no need to expose this with @ApiProperty

  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn()
  @ApiProperty({ type: () => Address })
  address: Address;

  @CreateDateColumn({ name: 'created_timestamp', type: 'timestamp with time zone' })
  @ApiProperty({ example: '2025-07-31T13:00:00.000Z' })
  createdTimestamp: Date;

  @UpdateDateColumn({ name: 'updated_timestamp', type: 'timestamp with time zone' })
  @ApiProperty({ example: '2025-07-31T13:05:00.000Z' })
  updatedTimestamp: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
