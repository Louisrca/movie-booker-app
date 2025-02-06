import { Controller, Body, Post, UseGuards, Get, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDTO } from './dto/booking.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiBody, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  @ApiResponse({
    status: 201,
    description: 'Create booking',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({
    type: BookingDTO,
    description: 'Json structure for booking object',
  })
  @ApiBearerAuth()
  async createBooking(
    @Body()
    bookingData: BookingDTO,
  ) {
    const createBooking = await this.bookingService.createBooking(bookingData);

    return createBooking;
  }

  @UseGuards(AuthGuard)
  @Get('/user-bookings/:userId')
  @ApiResponse({
    status: 201,
    description: 'Show all user bookings',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'User ID',
  })
  async userBookings(
    @Param()
    user: {
      userId: string;
    },
  ) {
    return await this.bookingService.userBookings(user);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  @ApiResponse({
    status: 201,
    description: 'Show user booking',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
    description: 'booking by ID',
  })
  async userBooking(
    @Param()
    booking: {
      id: string;
    },
  ) {
    return await this.bookingService.userBooking(booking);
  }
}
