import { BookingDTO } from './dto/booking.dto';

export const bookingMock: BookingDTO = {
  userId: 'd1d4c641-2714-445c-984c-ded25f14a5df',
  movieId: 1234,
  movieName: 'Harry Potter',
  bookingTime: new Date('2026-10-05T10:00:00.000Z'),
};

export const pastBookingMock: BookingDTO = {
  userId: 'd1d4c641-2714-445c-984c-ded25f14a5df',
  movieId: 1234,
  movieName: 'Harry Potter',
  bookingTime: new Date('2026-10-05T05:00:00.000Z'),
};
