import { webApiCall } from "../utils/api";
import { useQuery } from "@tanstack/react-query";

export const useGetMoviesByPage = (page: number) => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: () =>
      webApiCall(`/movies/search/page=${page}`, {
        method: "GET",
        body: null,
      }),
  });
};
