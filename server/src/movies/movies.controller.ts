import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({
    status: 201,
    description: 'Show all movies and filter by page',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth()
  async getMoviesByPage(@Query() params: { page: number }) {
    return this.moviesService.getMoviesByPage(params.page);
  }
  @UseGuards(AuthGuard)
  @Get('search')
  @ApiResponse({
    status: 201,
    description: 'Show movies by name',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth()
  async getMovieByName(@Query() params: { name: string }) {
    return this.moviesService.getMovieByName(params.name);
  }
}
