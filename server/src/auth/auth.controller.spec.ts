import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';
import { v4 as uuidv4 } from 'uuid';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService, UserService],
      imports: [
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1d' },
        }),
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a token when a user signs in', async () => {
    const userData = {
      email: 'r.armstrong@mail.com',
      password: 'password',
    };

    const token = await controller.login(userData);

    expect(token).toBeDefined();
    expect(token).toHaveProperty('response');
    expect(token.response).toHaveProperty('token');
  });

  it('should return a user when a user signs up', async () => {
    const uuid = uuidv4();
    const userData = {
      email: `r.armstrong${uuid}@mail.com`,
      password: 'Password123@',
      firstName: 'Ricky Jest Test',
      lastName: 'Armstrong Jest Test',
    };

    const user = await controller.register(userData);
    expect(user).toBeDefined();
    expect(user).toHaveProperty('status');
    expect(user).toHaveProperty('message');
    expect(user.message).toHaveProperty('email');
  });
});
