import { IsInt, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BookingDTO {
  @IsString()
  @ApiProperty({
    description: 'The id of the booking',
    example: 'f82d9fc5-a25b-4356-a9e9-b8e87d598f7d',
  })
  userId: string;

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
    example: '2026-10-05T00:00:00.000Z',
  })
  bookingTime: Date;
}
