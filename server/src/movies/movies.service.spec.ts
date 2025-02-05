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

  describe('getMovieByName', () => {
    it('should return movie data for a given name', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockMoviesDTO),
      });

      const result = await service.getMovieByName({
        name: 'The Lord Of The Ring',
      });
      expect(result).toEqual(mockMoviesDTO);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('query=The%20Lord%20Of%20The%20Ring'),
        expect.any(Object),
      );
    });
  });

  describe('getMovieByPageAndName', () => {
    it('should return movies data for a given page and name', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockMoviesDTO),
      });

      const result = await service.getMovieByPageAndName({
        page: 2,
        name: 'Movie 2',
      });
      expect(result).toEqual(mockMoviesDTO);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('query=Movie%202&page=2'),
        expect.any(Object),
      );
    });
  });
});
