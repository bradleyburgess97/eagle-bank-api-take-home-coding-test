import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(BankAccount)
    private readonly accountsRepo: Repository<BankAccount>,
  ) {}

  private generateAccountNumber(): string {
    const suffix = Math.floor(Math.random() * 1_000_000)
      .toString()
      .padStart(6, '0');
    return `01${suffix}`;
  }

  async create(createAccountDto: CreateAccountDto, user: User): Promise<BankAccount> {
    let accountNumber: string;
    for (let i = 0; i < 5; i++) {
      accountNumber = this.generateAccountNumber();
      const exists = await this.accountsRepo.findOne({ where: { accountNumber } });
      if (!exists) break;
      if (i === 4) {
        throw new ConflictException('Unable to generate unique account number');
      }
    }

    const account = this.accountsRepo.create({
      accountNumber: accountNumber!,
      sortCode: '10-10-10',
      name: createAccountDto.name,
      accountType: createAccountDto.accountType,
      balance: 0,
      currency: 'GBP',
      user,
    });
    return this.accountsRepo.save(account);
  }
}
