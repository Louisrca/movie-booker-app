import { BadRequestException, Injectable } from '@nestjs/common';
// on pourrait aussi importer User généré par prisma ici, mais on préfère importer le DTO
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<{ status: number; response: UserDto } | BadRequestException> {
    if (!userWhereUniqueInput.email) {
      return new BadRequestException('User email is required.');
    }

    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    return user
      ? { status: 201, response: user }
      : new BadRequestException('User not found.');
  }

  async users(): Promise<
    { status: number; response: UserDto[] } | BadRequestException
  > {
    const users = await this.prisma.user.findMany();
    return users
      ? { status: 201, response: users }
      : new BadRequestException('No users found.');
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<UserDto> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<UserDto> {
    return this.prisma.user.delete({
      where,
    });
  }
}
