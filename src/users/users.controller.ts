import { Controller, Post, Body, Get, Param, UseGuards, Req, ForbiddenException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

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
  async getUser(@Param('userId') userId: string, @Req() req: Request) {
    const authenticatedUser = req.user as any;

    if (authenticatedUser.id !== Number(userId)) {
      throw new ForbiddenException('You can only access your own user details');
    }

    const user = await this.usersService.findOneById(Number(userId));
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...result } = user;
    return result;
  }
}
