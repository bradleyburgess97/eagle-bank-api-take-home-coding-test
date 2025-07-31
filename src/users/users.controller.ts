import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  ForbiddenException,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.decorator';
import { User as UserEntity } from './user.entity';

@ApiTags('Users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User has been created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid details supplied' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':userId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch user details by ID' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user to fetch' })
  @ApiResponse({ status: 200, description: 'User details returned successfully', type: UserEntity })
  @ApiResponse({ status: 403, description: 'Forbidden - cannot access other users\' details' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUser(
    @Param('userId', ParseIntPipe) userId: number,
    @User() authenticatedUser: UserEntity,
  ) {
    if (authenticatedUser.id !== userId) {
      throw new ForbiddenException('You can only access your own user details');
    }

    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...result } = user;
    return result;
  }
}
