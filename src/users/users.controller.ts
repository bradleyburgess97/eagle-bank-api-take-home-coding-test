import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.decorator';
import { User as UserEntity } from './user.entity';

@ApiTags('Users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User has been created successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid details supplied' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':userId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch user details by ID' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user',
  })
  @ApiResponse({
    status: 200,
    type: UserEntity,
  })
  @ApiResponse({ status: 400, description: "The request didn't supply all the necessary data" })
  @ApiResponse({ status: 401, description: 'Access token is missing or invalid' })
  @ApiResponse({
    status: 403,
    description: "The user is not allowed to access the transaction",
  })
  @ApiResponse({ status: 404, description: 'User was not found' })
  async getUser(
    @Param('userId') userId: string,
    @User() authenticatedUser: UserEntity,
  ) {
    const parsedId = Number(userId);

    if (isNaN(parsedId)) {
      throw new BadRequestException('Invalid user ID');
    }

    if (authenticatedUser.id !== parsedId) {
      throw new ForbiddenException('You can only access your own user details');
    }

    const user = await this.usersService.findOneById(parsedId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...result } = user;
    return result;
  }
}
