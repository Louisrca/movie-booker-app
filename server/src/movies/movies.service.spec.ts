import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { mockMoviesDTO } from './movies.mock';

global.fetch = jest.fn();

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMoviesByPage', () => {
    it('should return movies data for a given page', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockMoviesDTO),
      });

      const result = await service.getMoviesByPage({ page: 1 });
      expect(result).toEqual(mockMoviesDTO);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('page=1'),
        expect.any(Object),
      );
    });
  });
});
