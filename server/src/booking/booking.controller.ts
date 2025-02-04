import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDTO } from './dto/booking.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  async createBooking(
    @Body()
    bookingData: BookingDTO,
  ) {
    const createBooking = await this.bookingService.createBooking(bookingData);

    return createBooking;
  }
}
