import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { MoviesDTO } from './dto/movies.dto';

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
  @ApiBody({
    type: MoviesDTO,
    description: 'Json structure for users object',
  })
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
  @ApiBody({
    type: MoviesDTO,
    description: 'Json structure for users object',
  })
  async getMovieByName(@Query() params: { name: string }) {
    return this.moviesService.getMovieByName(params.name);
  }
}
