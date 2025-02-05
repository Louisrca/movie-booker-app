import { MoviesDTO } from './dto/movies.dto';
export const mockMoviesDTO: MoviesDTO = {
  results: [
    {
      adult: false,
      backdrop_path: '/bfh9Z3Ghz4FOJAfLOAhmc3ccnHU.jpg',
      genre_ids: [12, 14],
      id: 671,
      original_language: 'en',
      original_title: "Harry Potter and the Philosopher's Stone",
      overview:
        "Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard—with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry. As he learns to harness his newfound powers with the help of the school's kindly headmaster, Harry uncovers the truth about his parents' deaths—and about the villain who's to blame.",
      popularity: 168.14,
      poster_path: '/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg',
      release_date: '2001-11-16',
      title: "Harry Potter and the Philosopher's Stone",
      video: false,
      vote_average: 7.905,
      vote_count: 27832,
    },
  ],
  page: 1,
  total_pages: 10,
  total_results: 100,
};
