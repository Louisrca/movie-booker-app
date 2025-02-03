import { Controller, Get, Param } from '@nestjs/common';
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
    return await this.userService.users();
  }
}
