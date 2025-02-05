import { BadRequestException, Injectable } from '@nestjs/common';
import { MoviesDTO } from './dto/movies.dto';

@Injectable()
export class MoviesService {
  constructor() {}

  async getMoviesByPage({ page = 1 }: { page: number }): Promise<MoviesDTO> {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    };

    return await fetch(url, options)
      .then((res) => res.json())
      .then((data: MoviesDTO) => data);
  }

  async getMovieByName({
    name = 'The Lord Of The Ring',
  }: {
    name: string;
  }): Promise<MoviesDTO> {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURI(name)}&include_adult=false&language=en-US`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    };

    return await fetch(url, options)
      .then((res) => res.json())
      .then((data: MoviesDTO) => data);
  }

  async getMovieByPageAndName({
    page = 1,
    name,
  }: {
    page?: number;
    name: string;
  }): Promise<MoviesDTO> {
    if (!name) {
      throw new BadRequestException('Name is required');
    }
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURI(name)}&page=${page}&include_adult=false&language=en-US`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    };

    return await fetch(url, options)
      .then((res) => res.json())
      .then((data: MoviesDTO) => data)
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }
}
