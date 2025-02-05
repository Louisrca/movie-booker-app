import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDTO } from './dto/booking.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

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
}
