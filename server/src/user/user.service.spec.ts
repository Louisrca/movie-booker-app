import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { UserService } from './user.service';
import { BadRequestException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;

  const mockUserDto = {
    email: 'test@example.com',
    name: 'Test User',
  };

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('user', () => {
    it('should return a user with status 201 when found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUserDto);

      const result = await userService.user({ email: 'test@example.com' });
      expect(result).toEqual({ status: 201, response: mockUserDto });
    });

    it('should return BadRequestException if email is not provided', async () => {
      const result = await userService.user({ email: '' });
      expect(result).toBeInstanceOf(BadRequestException);
      if (result instanceof BadRequestException) {
        expect(result.message).toBe('User email is required.');
      }
    });

    it('should return BadRequestException when user is not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      const result = await userService.user({ email: 'test@example.com' });
      expect(result).toBeInstanceOf(BadRequestException);
      if (result instanceof BadRequestException) {
        expect(result.message).toBe('User not found.');
      }
    });
  });

  describe('users', () => {
    it('should return a list of users with status 201', async () => {
      const mockUsers = [
        mockUserDto,
        { email: 'test2@example.com', name: 'Test User 2' },
      ];
      mockPrismaService.user.findMany.mockResolvedValue(mockUsers);

      const result = await userService.users();
      expect(result).toEqual({ status: 201, response: mockUsers });
    });
  });
});
