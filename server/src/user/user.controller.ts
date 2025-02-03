import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

import { User as UserModel } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/auth/register')
  async register(
    @Body()
    userData: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
  ): Promise<UserModel> {
    const { email, password, firstName, lastName } = userData;
    if (!email || !password || !firstName || !lastName) {
      throw new Error('Missing data');
    }
    return this.userService.createUser(userData);
  }

  @Post('/auth/login')
  login(
    @Body()
    userData: {
      email: string;
      password: string;
    },
  ): Promise<{ token: string }> {
    const { email, password } = userData;
    if (!email || !password) {
      throw new Error('Missing data');
    }
    return this.userService.login(userData);
  }
}
