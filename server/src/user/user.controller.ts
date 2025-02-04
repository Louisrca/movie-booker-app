import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
// on pourrait aussi importer User généré par prisma ici, mais on préfère importer le DTO
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get(':email')
  @ApiResponse({
    status: 201,
    description: 'Show user by email',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: UserDto,
    description: 'Json structure for user object',
  })
  async getUser(@Param('email') email: string) {
    const user = await this.userService.user({ email: email });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return { status: 201, message: await this.userService.user({ email }) };
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({
    status: 201,
    description: 'Show all users',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: [UserDto],
    description: 'Json structure for users object',
  })
  async getUsers() {
    const users = await this.userService.users();
    if (!users) {
      throw new BadRequestException('Users not found');
    }

    return { status: 201, message: await this.userService.users() };
  }
}
