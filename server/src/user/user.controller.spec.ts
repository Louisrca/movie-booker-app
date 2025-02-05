import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt'; // Importer JwtModule

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [JwtModule.register({ secret: 'testSecret' })], // Ajouter JwtModule
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        JwtService, // Ajouter JwtService dans les providers si nécessaire
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
