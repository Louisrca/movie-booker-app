import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsDate,
  IsString,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MovieResultDTO {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Indicates whether the movie is for adults',
    example: false,
  })
  adult: boolean;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The backdrop path of the movie',
    example: '/path.png',
  })
  backdrop_path: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The genre ids associated with the movie',
    example: [1, 2, 3],
  })
  genre_ids: number[];

  @IsInt()
  @ApiProperty({
    description: 'The unique identifier of the movie',
    example: 1,
  })
  id: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The original language of the movie',
    example: 'en-US',
  })
  original_language: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The original title of the movie',
    example: 'The Movie',
  })
  original_title: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'A brief overview of the movie plot',
    example: 'The movie is about...',
  })
  overview: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the movie',
    example: 'The Movie',
  })
  title: string;

  @IsInt()
  @ApiProperty({
    description: 'The popularity score of the movie',
    example: 2444,
  })
  popularity: number;

  @IsBoolean()
  @ApiProperty({
    description: 'Indicates if the movie has a video available',
    example: false,
  })
  video: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The poster image path for the movie',
    example: '/path.png',
  })
  poster_path: string;

  @IsInt()
  @ApiProperty({
    description: 'The average vote of the movie',
    example: 8,
  })
  vote_average: number;

  @IsInt()
  @ApiProperty({
    description: 'The number of votes received by the movie',
    example: 2444,
  })
  vote_count: number;

  @IsDate()
  @ApiProperty({
    description: 'The release date of the movie',
    example: '2021-10-05T00:00:00.000Z',
  })
  release_date: string;
}

export class MoviesDTO {
  @IsInt()
  @ApiProperty({
    description: 'The page number for the movie results',
    example: 1,
  })
  page: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: 'List of movie results',
    type: [MovieResultDTO],
  })
  results: MovieResultDTO[];

  @IsInt()
  @ApiProperty({
    description: 'Total number of pages available',
    example: 10,
  })
  total_pages: number;

  @IsInt()
  @ApiProperty({
    description: 'Total number of results found',
    example: 100,
  })
  total_results: number;
}
