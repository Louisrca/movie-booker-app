import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
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
    return await this.userService.user({ email: email });
  }

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
    return await this.userService.users();
  }
}
