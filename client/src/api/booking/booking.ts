import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useGetBookings = (userId: string) => {
  return useQuery({
    queryKey: ["bookings", userId],
    queryFn: () =>
      webApiCall(`/booking/user-bookings/${userId}`, {
        method: "GET",
        body: null,
      }),
    refetchOnMount: "always",
    staleTime: 5 * 60 * 1000,
  });
};
