jest.mock('../auth/auth.guard', () => ({
  AuthGuard: jest.fn().mockImplementation(() => true),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

import { bookingMock } from './booking.mock';
describe('BookingController', () => {
  let controller: BookingController;

  const mockBookingService = {
    createBooking: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        {
          provide: BookingService,
          useValue: mockBookingService,
        },
      ],
    }).compile();

    controller = module.get<BookingController>(BookingController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a booking', async () => {
    mockBookingService.createBooking.mockResolvedValue({
      status: 201,
      response: bookingMock,
    });

    const result = await controller.createBooking(bookingMock);

    expect(result).toEqual({
      status: 201,
      response: bookingMock,
    });
  });
});
