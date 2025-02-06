import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
// on pourrait aussi importer User généré par prisma ici, mais on préfère importer le DTO
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async comparePassword(password: string, hashedPassword: string) {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  }

  validePasswordRegex(password: RegisterUserDto['password']) {
    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%*?&])[A-Za-z\d!@#$%*?&]{8,}$/;
    if (!regexPassword.test(password)) {
      throw new BadRequestException(
        'Invalid password: 8+ chars, uppercase, lowercase, number, special (!@#$%*?&).',
      );
    }
    return true;
  }

  async register(data: RegisterUserDto): Promise<RegisterUserDto> {
    const { email, password } = data;

    const existingUser = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists.');
    }

    this.validePasswordRegex(password);

    data.password = await this.hashPassword(password);

    return this.prisma.user.create({
      data,
    });
  }

  async login(data: LoginUserDto): Promise<{ token: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new BadRequestException(
        'Error while logging in, email or password incorrect.',
      );
    }

    const isValid = await this.comparePassword(data.password, user.password);
    if (!isValid) {
      throw new BadRequestException(
        'Error while logging in, email or password incorrect.',
      );
    }

    const payload = { email: user.email, userId: user.id };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
