import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
// on pourrait aussi importer User généré par prisma ici, mais on préfère importer le DTO
// import { UserDto } from './dto/user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UserDto } from './dto/user.dto';

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
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBearerAuth()
  @ApiBody({
    type: UserDto,
    description: 'Json structure for user object',
  })
  async getUser(@Param('email') email: string) {
    return await this.userService.user({ email });
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({
    status: 201,
    description: 'Show all users',
  })
  @ApiBody({
    type: [UserDto],
    description: 'Json structure for users object',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBearerAuth()
  async getUsers() {
    return await this.userService.users();
  }
}
