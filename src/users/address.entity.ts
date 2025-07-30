import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  line1: string;

  @Column({ nullable: true })
  line2: string;

  @Column({ nullable: true })
  line3: string;

  @Column()
  town: string;

  @Column()
  county: string;

  @Column()
  postcode: string;
}