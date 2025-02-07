import { webApiCall } from "../utils/api";
import { useQuery } from "@tanstack/react-query";

export const useGetMovies = ({
  page = 1,
  name,
}: {
  page: number;
  name?: string;
}) => {
  const searchName = name !== "" ? `&name=${name}` : "";
  return useQuery({
    queryKey: ["movies", page, name],
    queryFn: () =>
      webApiCall(`/movies?page=${page}${searchName}`, {
        method: "GET",
        body: null,
      }),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });
};

export const useGetMovieById = (id: number) => {
  return useQuery({
    queryKey: ["movieById", id],
    queryFn: () =>
      webApiCall(`/movies/${id}`, {
        method: "GET",
        body: null,
      }),
    staleTime: 5 * 60 * 1000,
  });
};
