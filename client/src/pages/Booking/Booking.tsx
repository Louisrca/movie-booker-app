import { useGetBookings } from "../../api/booking/booking";
import { decodeJwt } from "../../utils/decodeJwt";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Paper,
  CircularProgress,
} from "@mui/material";

import { NavBar } from "../../components/NavBar/NavBar";

// Définir le type correct pour Booking
type Booking = {
  id: string;
  movieName: string;
  movieId: number;
  bookingTime: string;
};

export default function Booking() {
  const userId = decodeJwt();

  const { data, isLoading } = useGetBookings(userId);
  console.log("🚀 ~ Booking ~ data:", data);

  if (isLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <NavBar />
      <Container>
        <Typography variant="h4" gutterBottom>
          Mes Réservations
        </Typography>

        {data.response === 0 ? (
          <Typography variant="h6" color="textSecondary">
            Aucune réservation trouvée.
          </Typography>
        ) : (
          <Paper sx={{ maxHeight: 400, overflow: "auto" }}>
            <List>
              {data.response.map((booking: Booking) => (
                <ListItem key={booking.id}>
                  <ListItemText
                    primary={`Film: ${
                      booking.movieName
                    } - Date et heure: ${new Date(
                      booking.bookingTime
                    ).toLocaleString()}`}
                    secondary={`Réservation ID: ${booking.id}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Container>
    </>
  );
}
