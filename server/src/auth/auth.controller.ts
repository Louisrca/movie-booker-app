import { Controller } from '@nestjs/common';
import { Post, Body, BadRequestException } from '@nestjs/common';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
// on pourrait aussi importer User généré par prisma ici, mais on préfère importer le DTO
import { LoginUserDto } from './dto/loginUser.dto';
import { RegisterUserDto } from './dto/registerUser.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post('/register')
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
  ): Promise<{ status: number; message: RegisterUserDto }> {
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
      message: await this.authService.register(userData),
    };
  }

  @Post('/login')
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
    const token = await this.authService.login(userData);
    return { status: 201, response: token };
  }
}
