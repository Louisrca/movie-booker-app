import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { PrismaService } from '../prisma.service';
import { BadRequestException } from '@nestjs/common';
import { addHours } from 'date-fns';
import { bookingMock } from './booking.mock';

describe('BookingService', () => {
  let bookingService: BookingService;

  // Mock Prisma Service
  const mockPrismaService = {
    booking: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    bookingService = module.get<BookingService>(BookingService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('userBooking', () => {
    // ajouter test dans le cas ou l'id de la reservation n'est pas fourni

    // it('should throw BadRequestException when booking ID is not provided', async () => {
    //   await expect(bookingService.userBooking({ id: 123 })).rejects.toThrow(
    //     BadRequestException,
    //   );
    //   await expect(bookingService.userBooking({ id: 123 })).rejects.toThrow(
    //     'Booking ID is required.',
    //   );
    // });

    it('should return booking when ID is provided', async () => {
      const mockBooking = {
        id: 1,
        userId: 1,
        bookingTime: new Date(),
      };

      mockPrismaService.booking.findUnique.mockResolvedValue(mockBooking);

      const result = await bookingService.userBooking({ id: 1 });

      expect(result).toEqual({
        status: 201,
        response: mockBooking,
      });
      expect(mockPrismaService.booking.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('userBookings', () => {
    // ajouter test dans le cas ou l'id de l'utilisateur n'est pas fourni

    // it('should throw BadRequestException when user ID is not provided', async () => {
    //   const result = await bookingService.userBookings({ userId: 123 });

    //   expect(result).toBeInstanceOf(BadRequestException);
    //   if (result instanceof BadRequestException) {
    //     expect(result.message).toBe('User ID is required.');
    //   }
    // });

    it('should return user bookings when user ID is provided', async () => {
      const mockBookings = [
        { id: 1, userId: 1, bookingTime: new Date() },
        { id: 2, userId: 1, bookingTime: new Date() },
      ];

      mockPrismaService.booking.findMany.mockResolvedValue(mockBookings);

      const result = await bookingService.userBookings({ userId: 1 });

      expect(result).toEqual({
        status: 201,
        response: mockBookings,
      });
      expect(mockPrismaService.booking.findMany).toHaveBeenCalledWith({
        where: { userId: 1 },
      });
    });
  });

  describe('getLatestBooking', () => {
    it('should return the latest booking', async () => {
      const mockLatestBooking = {
        id: 1,
        userId: 1,
        bookingTime: new Date(),
        createdAt: new Date(),
      };

      mockPrismaService.booking.findFirst.mockResolvedValue(mockLatestBooking);

      const result = await bookingService.getLatestBooking();

      expect(result).toEqual(mockLatestBooking);
      expect(mockPrismaService.booking.findFirst).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should return null when no bookings exist', async () => {
      mockPrismaService.booking.findFirst.mockResolvedValue(null);

      const result = await bookingService.getLatestBooking();

      expect(result).toBeNull();
    });
  });

  describe('createBooking', () => {
    it('should create booking when no previous bookings exist', async () => {
      mockPrismaService.booking.findFirst.mockResolvedValue(null);

      const createdBooking = {
        id: 1,
        ...bookingMock,
      };
      mockPrismaService.booking.create.mockResolvedValue(createdBooking);

      const result = await bookingService.createBooking(createdBooking);

      expect(result).toEqual({
        status: 201,
        response: createdBooking,
      });
    });
    // ajouter test pour le cas ou la date de reservation est dans le passé

    // it.only('should prevent booking in the past', async () => {
    //   console.log('🔎 ~ hello loupe', pastBookingMock);

    //   const result = await bookingService.createBooking(pastBookingMock);
    //   console.log('🚀 ~ it.only ~ result:', result);
    //   expect(result).toBeInstanceOf(BadRequestException);
    // });

    it('should prevent booking within 2 hours of latest booking', async () => {
      const existingBooking = {
        id: 1,
        userId: 1,
        bookingTime: new Date(),
      };
      mockPrismaService.booking.findFirst.mockResolvedValue(existingBooking);

      const newBookingTime = addHours(new Date(existingBooking.bookingTime), 1);
      const newBookingData = {
        ...bookingMock,
        bookingTime: newBookingTime,
      };

      const result = await bookingService.createBooking(newBookingData);

      expect(result).toBeInstanceOf(BadRequestException);
      if (result instanceof BadRequestException) {
        expect(result.message).toBe(
          'You cannot book two movies within 2 hours of each other.',
        );
      }
    });

    it('should allow booking after 2 hours from latest booking', async () => {
      const existingBooking = {
        id: 1,
        userId: 1,
        bookingTime: new Date(),
      };
      mockPrismaService.booking.findFirst.mockResolvedValue(existingBooking);

      const newBookingTime = addHours(new Date(existingBooking.bookingTime), 3);
      const newBookingData = {
        ...bookingMock,
        bookingTime: newBookingTime,
      };

      const createdBooking = {
        id: 2,
        ...newBookingData,
      };
      mockPrismaService.booking.create.mockResolvedValue(createdBooking);

      const result = await bookingService.createBooking(newBookingData);

      expect(result).toEqual({
        status: 201,
        response: createdBooking,
      });
    });
  });
});
