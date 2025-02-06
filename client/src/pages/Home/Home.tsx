import { Key } from "react";
import { Grid2, Box, CircularProgress, Typography } from "@mui/material";
import { useGetMovies } from "../../api/movies/movies";
import MovieCard from "../../components/MovieCard/MovieCard";
// import { PaginationLayout } from "../../components/Pagination/Pagination";

export default function Home() {
  const { data, isLoading, isError } = useGetMovies();
  console.log("🚀 ~ Home ~ data:", data);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data || data.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h6" color="textSecondary">
          Aucun film trouvé.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid2
        container
        spacing={2}
        justifyContent="center"
        sx={{ mt: 5, px: 5 }}
      >
        {data.results.map(
          (movie: {
            id: Key | null | undefined;
            title: string;
            poster_path: string;
            vote_average: number;
          }) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              rating={movie.vote_average}
            />
          )
        )}
      </Grid2>
      {/* <PaginationLayout /> */}
    </>
  );
}
