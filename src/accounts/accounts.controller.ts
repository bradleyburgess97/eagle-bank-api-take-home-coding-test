import {
  Controller,
  Post,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { AuthGuard } from '@nestjs/passport';
import { User as UserDecorator } from '../auth/user.decorator';
import { User } from '../users/user.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BankAccount } from './account.entity';

@ApiTags('Accounts')
@Controller('v1/accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new bank account' })
  @ApiResponse({
    status: 201,
    description: 'Bank Account has been created successfully',
    type: BankAccount,
  })
  @ApiResponse({ status: 400, description: 'Invalid details supplied' })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({
    status: 403,
    description: 'The user is not allowed to access the transaction',
  })
  async create(
    @Body() createAccountDto: CreateAccountDto,
    @UserDecorator() user: User,
  ) {
    if (!createAccountDto.name || !createAccountDto.accountType) {
      throw new BadRequestException('Missing required fields');
    }

    const bankAccount = await this.accountsService.create(
      createAccountDto,
      user,
    );

    return {
      accountNumber: bankAccount.accountNumber,
      sortCode: '10-10-10',
      name: bankAccount.name,
      accountType: bankAccount.accountType,
      balance: Number(bankAccount.balance),
      currency: 'GBP',
      createdTimestamp: bankAccount.createdTimestamp.toISOString(),
      updatedTimestamp: bankAccount.updatedTimestamp.toISOString(),
    };
  }
}
