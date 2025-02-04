import { IsInt, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BookingDTO {
  @IsInt()
  @ApiProperty({
    description: 'The id of the booking',
    example: 1,
  })
  userId: number;

  @IsInt()
  @ApiProperty({
    description: 'The id of the movie',
    example: 1,
  })
  movieId: number;

  @IsString()
  @ApiProperty({
    description: 'The name of the movie',
    example: 'The Movie',
  })
  movieName: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: 'The booking time of the movie',
    example: '2021-10-05T00:00:00.000Z',
  })
  bookingTime: Date;
}
