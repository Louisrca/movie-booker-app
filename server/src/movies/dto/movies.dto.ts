import { IsBoolean, IsInt, IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MovieResultDTO {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The adult status of the movie',
    example: 'false',
  })
  adult: boolean;
  @IsNotEmpty()
  @ApiProperty({
    description: 'The backdrop path of the movie',
    example: '/path.png',
  })
  backdrop_path: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The genre ids of the movie',
    example: [1, 2, 1],
  })
  genre_ids: [number];
  @IsInt()
  @ApiProperty({
    description: 'The id of the movie',
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
    description: 'The overview of the movie',
    example: 'The movie is about...',
  })
  overview: string;
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the movie',
    example: 'The Movie',
  })
  title: string;
  @IsNotEmpty()
  @ApiProperty({
    description: 'The poster path of the movie',
    example: '/path.png',
  })
  poster_path: string;
  @IsInt()
  @ApiProperty({
    description: 'The average vote of the movie',
    example: 2444.44,
  })
  vote_average: number;
  @IsInt()
  @ApiProperty({
    description: 'The vote count of the movie',
    example: 2444,
  })
  vote_count: number;
  @IsDate()
  @ApiProperty({
    description: 'The release date of the movie',
    example: '2021-10-05T00:00:00.000Z',
  })
  release_date: Date;
}

export class MoviesDTO {
  @IsInt()
  @ApiProperty({
    description: 'The page number of the movies',
    example: 1,
  })
  page: number;
  @IsNotEmpty()
  @ApiProperty({
    description: 'The total results of the movies',
    type: [MovieResultDTO],
  })
  results: MovieResultDTO[];
}
