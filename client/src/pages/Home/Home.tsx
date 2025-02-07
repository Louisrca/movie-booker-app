import {
  Grid2,
  Box,
  CircularProgress,
  Typography,
  Stack,
  Pagination,
  TextField,
  Button,
} from "@mui/material";
import { NavBar } from "../../components/NavBar/NavBar";
import { useGetMovies } from "../../api/movies/movies";
import MovieCard from "../../components/MovieCard/MovieCard";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [name, setName] = useState("");

  const { data, isLoading, isError } = useGetMovies({ page, name });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName(searchInput);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <NavBar />
      <Box sx={{ px: 3, py: 2 }}>
        {/* Formulaire de recherche */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          justifyContent="center"
          mb={3}
          gap={2}
        >
          <TextField
            id="search-movie"
            label="Rechercher un film"
            variant="outlined"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            fullWidth
            sx={{ maxWidth: 400 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Rechercher
          </Button>
        </Box>
        {/* Liste des films */}
        {isError || !data || data.results.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            Aucun film trouvé.
          </Typography>
        ) : (
          <>
            <Grid2 container spacing={2} justifyContent="center">
              {data.results.map(
                (movie: {
                  id: number;
                  title: string;
                  poster_path: string;
                  vote_average: number;
                }) => (
                  <MovieCard
                    key={movie.id}
                    movieId={movie.id}
                    title={movie.title}
                    posterPath={movie.poster_path}
                    rating={movie.vote_average}
                  />
                )
              )}
            </Grid2>

            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Pagination
                count={data.total_pages}
                page={page}
                onChange={(event, value) => setPage(value)}
                color="primary"
              />
            </Stack>
          </>
        )}
      </Box>
    </>
  );
}
