import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
// on pourrait aussi importer User généré par prisma ici, mais on préfère importer le DTO
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/registerUser.dto';

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

  async register(data: Prisma.UserCreateInput): Promise<RegisterUserDto> {
    if (data.password) {
      data.password = await this.hashPassword(data.password);
    }
    return this.prisma.user.create({
      data,
    });
  }

  async login(data: {
    email: string;
    password: string;
  }): Promise<{ token: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const isValid = await this.comparePassword(data.password, user.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }

    const payload = { email: user.email, sub: user.id };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
