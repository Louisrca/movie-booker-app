import { Injectable } from '@nestjs/common';
// on pourrait aussi importer User généré par prisma ici, mais on préfère importer le DTO
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserDto | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(): Promise<UserDto[]> {
    return this.prisma.user.findMany();
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
