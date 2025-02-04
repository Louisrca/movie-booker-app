import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { BookingDTO } from './dto/booking.dto';
import { isWithinInterval, addHours } from 'date-fns';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async userBooking(bookingWhereUniqueInput: Prisma.BookingWhereUniqueInput) {
    return this.prisma.booking.findUnique({
      where: bookingWhereUniqueInput,
    });
  }

  async userBookings(userId: { userId: number }) {
    return this.prisma.booking.findMany({
      where: userId,
    });
  }

  async getLatestBooking() {
    return this.prisma.booking.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createBooking(
    data: Prisma.BookingCreateInput,
  ): Promise<BookingDTO | BadRequestException | null> {
    const latestBooking = await this.getLatestBooking();
    const now = new Date();

    if (!latestBooking) {
      return this.prisma.booking.create({
        data,
      });
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
        'You cannot book in the past, please select a future date',
      );
    }

    if (latestBooking && !isLatestBookingInInterval) {
      return this.prisma.booking.create({
        data,
      });
    }
    return new BadRequestException(
      'You cannot book two movies within 2 hours of each other',
    );
  }
}
