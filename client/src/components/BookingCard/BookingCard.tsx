import { Button } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useCreateBooking } from "../../api/booking/booking";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

export const BookingCard = ({
  movieId,
  movieName,
}: {
  movieId: number;
  movieName: string;
}) => {
  const [bookingData, setBookingData] = useState({
    userId: "",
    movieId: movieId,
    movieName: movieName,
    bookingTime: "",
  });

  const createBooking = useCreateBooking();

  const getUserIdFromJWT = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: { email: string; userId: string } =
          jwtDecode(token);
        return decodedToken?.userId;
      } catch (error) {
        console.error("Erreur lors du décodage du JWT", error);
        return "";
      }
    }
    return "";
  };

  useEffect(() => {
    const userId = getUserIdFromJWT();
    setBookingData((prevData) => ({
      ...prevData,
      userId,
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.bookingTime) {
      alert("Veuillez choisir un horaire de réservation.");
      return;
    }
    createBooking.mutate(bookingData);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          padding: "1rem",
        }}
      >
        {createBooking.isError && (
          <span style={{ color: "red" }}>
            {createBooking.error instanceof Error
              ? createBooking.error.message
              : "Une erreur s'est produite"}
          </span>
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            onChange={(newValue) => {
              setBookingData({
                ...bookingData,
                bookingTime: newValue?.toISOString() || "",
              });
            }}
            label="Choisir une date"
            value={
              bookingData.bookingTime ? dayjs(bookingData.bookingTime) : null
            }
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          type="submit"
        >
          Réserver un billet
        </Button>
      </form>
    </div>
  );
};
