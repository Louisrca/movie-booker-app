import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { BookingDTO } from './dto/booking.dto';
import { isWithinInterval, addHours } from 'date-fns';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async userBooking(bookingWhereUniqueInput: Prisma.BookingWhereUniqueInput) {
    if (!bookingWhereUniqueInput.id) {
      return new BadRequestException('Booking ID is required.');
    }
    return {
      status: 201,
      response: await this.prisma.booking.findUnique({
        where: { id: bookingWhereUniqueInput.id },
      }),
    };
  }

  async userBookings(user: {
    userId: number;
  }): Promise<
    { status: number; response: BookingDTO[] } | BadRequestException
  > {
    if (!user.userId) {
      return new BadRequestException('User ID is required.');
    }
    return {
      status: 201,
      response: await this.prisma.booking.findMany({
        where: { userId: user.userId },
      }),
    };
  }

  async getLatestBooking(): Promise<BookingDTO | null> {
    return await this.prisma.booking.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createBooking(
    data: Prisma.BookingCreateInput,
  ): Promise<{ status: number; response: BookingDTO } | BadRequestException> {
    const latestBooking = await this.getLatestBooking();
    const now = new Date();

    if (!latestBooking) {
      return {
        status: 201,
        response: await this.prisma.booking.create({
          data,
        }),
      };
    }

    const isLatestBookingInInterval = isWithinInterval(
      new Date(data.bookingTime),
      {
        start: new Date(latestBooking?.bookingTime),
        end: addHours(new Date(latestBooking?.bookingTime), 2),
      },
    );

    const isBookingDelay = now < new Date(data.bookingTime);

    if (!isBookingDelay) {
      return new BadRequestException(
        'You cannot book in the past, please select a future date.',
      );
    }

    if (latestBooking && !isLatestBookingInInterval) {
      return {
        status: 201,
        response: await this.prisma.booking.create({
          data,
        }),
      };
    }
    return new BadRequestException(
      'You cannot book two movies within 2 hours of each other.',
    );
  }
}
