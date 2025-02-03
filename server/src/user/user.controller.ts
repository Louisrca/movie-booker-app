import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

import { User as UserModel } from '@prisma/client';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { BadRequestException } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/auth/register')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: RegisterUserDto,
    description: 'Json structure for user object',
  })
  async register(
    @Body()
    userData: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
  ): Promise<{ status: number; message: UserModel }> {
    const { email, password, firstName, lastName } = userData;
    if (!email || !password || !firstName || !lastName) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Missing Email, Password, First Name or Last Name',
      });
    }

    const user = await this.userService.user({ email });

    if (user) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'User already exists',
      });
    }
    return {
      status: 201,
      message: await this.userService.createUser(userData),
    };
  }

  @Post('/auth/login')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully logged in.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: LoginUserDto,
    description: 'Json structure for user object',
  })
  async login(
    @Body()
    userData: {
      email: string;
      password: string;
    },
  ): Promise<{ status: number; response: { token: string } }> {
    const { email, password } = userData;
    if (!email || !password) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Missing Email or Password',
      });
    }
    const token = await this.userService.login(userData);
    return { status: 201, response: token };
  }
}
