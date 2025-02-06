import { webApiCall } from "../utils/api";
import { useQuery } from "@tanstack/react-query";

export const useGetMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: () =>
      webApiCall("/movies", {
        method: "GET",
        body: null,
      }),
  });
};
