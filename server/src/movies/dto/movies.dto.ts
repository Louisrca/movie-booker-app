import { IsBoolean, IsEmpty, IsInt } from 'class-validator';

export class MovieResultDTO {
  @IsBoolean()
  adult: boolean;
  @IsEmpty()
  backdrop_path: string;
  @IsEmpty()
  genre_ids: [number];
  @IsInt()
  id: number;
  @IsEmpty()
  original_language: string;
  @IsEmpty()
  original_title: string;
  @IsEmpty()
  overview: string;
  @IsEmpty()
  title: string;
  @IsEmpty()
  poster_path: string;
  @IsInt()
  vote_average: number;
  @IsInt()
  vote_count: number;
  @IsEmpty()
  release_date: string;
}

export class MoviesDTO {
  @IsInt()
  page: number;
  @IsEmpty()
  results: [MovieResultDTO];
}
