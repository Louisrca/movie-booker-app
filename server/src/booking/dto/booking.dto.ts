import { IsInt, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class BookingDTO {
  @IsInt()
  userId: number;

  @IsInt()
  movieId: number;

  @IsString()
  movieName: string;

  @IsDate()
  @Type(() => Date)
  bookingTime: Date;
}
