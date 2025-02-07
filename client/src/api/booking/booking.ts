import { useMutation } from "@tanstack/react-query";

import { webApiCall } from "../utils/api";

export type Booking = {
  movieId: number;
  userId: string;
  bookingTime: string;
  movieName: string;
};

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: async (booking: Booking) =>
      webApiCall("/booking/create", {
        method: "POST",
        body: JSON.stringify(booking),
      }),
  });
};
