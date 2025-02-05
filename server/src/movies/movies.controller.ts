import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger';
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
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', required: true })
  async getMoviesByPage(@Query() params: { page: number }) {
    return this.moviesService.getMoviesByPage({ page: params.page });
  }
  @UseGuards(AuthGuard)
  @Get('search/name')
  @ApiResponse({
    status: 201,
    description: 'Show movies by name',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'name', required: true })
  async getMovieByName(@Query() params: { name: string }) {
    return this.moviesService.getMovieByName({ name: params.name });
  }

  @UseGuards(AuthGuard)
  @Get('search')
  @ApiResponse({
    status: 201,
    description: 'Show movies by name and page',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', required: true })
  @ApiQuery({ name: 'name', required: true })
  @ApiBody({
    type: MoviesDTO,
    description: 'Json structure for movies object',
  })
  async getMovieByPageAndName(@Query() params: { page: number; name: string }) {
    return this.moviesService.getMovieByPageAndName(params);
  }
}
