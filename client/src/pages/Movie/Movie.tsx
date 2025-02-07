import { useGetMovieById } from "../../api/movies/movies";
import { useSearchParams, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Rating,
  CircularProgress,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";
import { BookingCard } from "../../components/BookingCard/BookingCard";

export default function Movie() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  console.log("🚀 ~ Movie ~ name:", name);

  // Récupération des données du film via useGetMovieById
  const movie = useGetMovieById(Number(id));

  // Si les données sont en train de se charger ou si une erreur survient
  if (movie.isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (movie.isError || !movie.data) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h6" color="textSecondary">
          Il y a eu une erreur en récupérant les détails du film.
        </Typography>
      </Box>
    );
  }

  // Extraction des informations du film
  const { title, overview, vote_average, poster_path, release_date } =
    movie.data;

  // Formatage de la date de sortie
  const formattedDate = dayjs(release_date).format("DD MMM YYYY");

  return (
    <Box sx={{ px: 3, py: 2 }}>
      <button onClick={() => window.history.back()}>Retour</button>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          boxShadow: 3,
        }}
      >
        {/* Image du film */}
        <CardMedia
          component="img"
          sx={{ width: 300, objectFit: "cover" }}
          image={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />

        <Box sx={{ p: 2, flex: 1 }}>
          {/* Titre et Note */}
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
            {title}
          </Typography>

          {/* Description du film */}
          <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
            {overview}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent={"center"}
          >
            <Rating
              name="movie-rating"
              value={vote_average / 2}
              precision={0.1}
              readOnly
            />
            <Typography variant="body1">({vote_average}/10)</Typography>
          </Stack>

          {/* Date de sortie */}
          <Typography variant="body2" color="textSecondary">
            Sortie le: {formattedDate}
          </Typography>

          {/* Bouton de réservation */}
          <BookingCard movieId={Number(id)} movieName={title} />
        </Box>
      </Card>
    </Box>
  );
}
