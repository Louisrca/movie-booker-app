import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getMoviesByPage(@Query() params: { page: number }) {
    return this.moviesService.getMoviesByPage(params.page);
  }
  @UseGuards(AuthGuard)
  @Get('search')
  async getMovieByName(@Query() params: { name: string }) {
    return this.moviesService.getMovieByName(params.name);
  }
}
