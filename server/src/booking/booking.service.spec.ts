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
    it('should throw BadRequestException when booking ID is not provided', async () => {
      await expect(
        bookingService.userBooking({ id: '' }), // Envoi d'un ID vide
      ).rejects.toThrow(BadRequestException);
      await expect(bookingService.userBooking({ id: '' })).rejects.toThrow(
        'Booking ID is required.',
      );
    });

    it('should return booking when ID is provided', async () => {
      const mockBooking = {
        id: 1,
        userId: 'f82d9fc5-a25b-4356-a9e9-b8e87d598f7d',
        bookingTime: new Date(),
      };

      mockPrismaService.booking.findUnique.mockResolvedValue(mockBooking);

      const result = await bookingService.userBooking({
        id: 'e57103ce-4b43-41e4-b596-700734e0a2c6',
      });

      expect(result).toEqual({
        status: 200,
        response: mockBooking,
      });
      expect(mockPrismaService.booking.findUnique).toHaveBeenCalledWith({
        where: { id: 'e57103ce-4b43-41e4-b596-700734e0a2c6' },
      });
    });
  });

  describe('userBookings', () => {
    it('should throw BadRequestException when user ID is not provided', async () => {
      await expect(
        bookingService.userBookings({ userId: '' }), // Envoi d'un `userId` vide
      ).rejects.toThrow(BadRequestException);
      await expect(bookingService.userBookings({ userId: '' })).rejects.toThrow(
        'User ID is required.',
      );
    });

    it('should return user bookings when user ID is provided', async () => {
      const mockBookings = [
        {
          id: 1,
          userId: 'f82d9fc5-a25b-4356-a9e9-b8e87d598f7d',
          bookingTime: new Date(),
        },
        {
          id: 2,
          userId: 'f82d9fc5-a25b-4356-a9e9-b8e87d598f7d',
          bookingTime: new Date(),
        },
      ];

      mockPrismaService.booking.findMany.mockResolvedValue(mockBookings);

      const result = await bookingService.userBookings({
        userId: 'f82d9fc5-a25b-4356-a9e9-b8e87d598f7d',
      });

      expect(result).toEqual({
        status: 200,
        response: mockBookings,
      });
      expect(mockPrismaService.booking.findMany).toHaveBeenCalledWith({
        where: { userId: 'f82d9fc5-a25b-4356-a9e9-b8e87d598f7d' },
      });
    });
  });

  describe('getLatestBooking', () => {
    it('should return the latest booking', async () => {
      const mockLatestBooking = {
        id: 1,
        userId: 'f82d9fc5-a25b-4356-a9e9-b8e87d598f7d',
        bookingTime: new Date(),
        createdAt: new Date(),
      };

      mockPrismaService.booking.findFirst.mockResolvedValue(mockLatestBooking);

      const result = await bookingService.getLatestBooking(
        'f82d9fc5-a25b-4356-a9e9-b8e87d598f7d',
      );

      expect(result).toEqual(mockLatestBooking);
      expect(mockPrismaService.booking.findFirst).toHaveBeenCalledWith({
        where: {
          userId: 'f82d9fc5-a25b-4356-a9e9-b8e87d598f7d',
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    });

    it('should return null when no bookings exist', async () => {
      mockPrismaService.booking.findFirst.mockResolvedValue(null);

      const result = await bookingService.getLatestBooking(
        'f82d9fc5-a25b-4356-a9e9-b8e87d598f7d',
      );

      expect(result).toBeNull();
    });
  });

  describe('createBooking', () => {
    it('should throw BadRequestException if booking date is in the past', async () => {
      const pastBookingMock = {
        userId: 'f82d9fc5-a25b-4356-a9e9-b8e87d598f7d',
        movieName: 'The Movie',
        movieId: 3,
        bookingTime: addHours(new Date(), -1), // 1 heure dans le passé
      };

      await expect(
        bookingService.createBooking(pastBookingMock),
      ).rejects.toThrow(BadRequestException);
      await expect(
        bookingService.createBooking(pastBookingMock),
      ).rejects.toThrow(
        'You cannot book in the past, please select a future date.',
      );
    });

    it('should throw BadRequestException if booking is within 2 hours of the latest booking', async () => {
      const existingBooking = {
        userId: 'f82d9fc5-a25b-4356-a9e9-b8e87d598f7d',
        movieName: 'The Movie',
        movieId: 3,
        bookingTime: new Date(),
      };

      mockPrismaService.booking.findFirst.mockResolvedValue(existingBooking);

      const newBookingMock = {
        userId: 'f82d9fc5-a25b-4356-a9e9-b8e87d598f7d',
        movieName: 'The Movie',
        movieId: 3,
        bookingTime: addHours(new Date(existingBooking.bookingTime), 1), // 1 heure après, donc dans l'intervalle
      };

      await expect(
        bookingService.createBooking(newBookingMock),
      ).rejects.toThrow(BadRequestException);
      await expect(
        bookingService.createBooking(newBookingMock),
      ).rejects.toThrow(
        'You cannot book two movies within 2 hours of each other.',
      );
    });

    it('should allow booking after 2 hours from latest booking', async () => {
      const existingBooking = {
        id: 1,
        userId: 'f82d9fc5-a25b-4356-a9e9-b8e87d598f7d',
        bookingTime: new Date(),
      };

      mockPrismaService.booking.findFirst.mockResolvedValue(existingBooking);

      const newBookingMock = {
        userId: 'f82d9fc5-a25b-4356-a9e9-b8e87d598f7d',
        movieName: 'The Movie',
        movieId: 3,
        bookingTime: addHours(new Date(existingBooking.bookingTime), 3), // 3 heures après, donc bien au-delà de 2 heures
      };

      const createdBooking = {
        id: 2,
        ...newBookingMock,
      };

      mockPrismaService.booking.create.mockResolvedValue(createdBooking);

      const result = await bookingService.createBooking(newBookingMock);

      expect(result).toEqual({
        status: 200,
        response: createdBooking,
      });
    });

    it('should create booking when no previous bookings exist', async () => {
      mockPrismaService.booking.findFirst.mockResolvedValue(null);

      const createdBooking = {
        id: 1,
        ...bookingMock,
      };
      mockPrismaService.booking.create.mockResolvedValue(createdBooking);

      const result = await bookingService.createBooking(createdBooking);

      expect(result).toEqual({
        status: 200,
        response: createdBooking,
      });
    });
  });
});
