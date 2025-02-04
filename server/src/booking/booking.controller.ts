import { Controller, Body, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDTO } from './dto/booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post('/create')
  async createBooking(
    @Body()
    bookingData: BookingDTO,
  ) {
    const createBooking = await this.bookingService.createBooking(bookingData);

    return createBooking;
  }
}
