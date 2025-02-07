import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import { useGetMoviesByPage } from "../../api/filter/filter";

export const PaginationLayout = () => {
  //   const movies = useGetMoviesByPage(2);
  //   console.log(movies);
  return (
    <div>
      <Stack sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination count={10} color="primary" />
      </Stack>
    </div>
  );
};
