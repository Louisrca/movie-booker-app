import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  title: string;
  posterPath: string;
  rating: number;
  movieId: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  posterPath,
  rating,
  movieId,
}) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{ width: 300, borderRadius: 2, boxShadow: 3 }}
      onClick={() => {
        navigate(`/movie/${movieId}?name=${title}`);
      }}
    >
      <CardMedia
        component="img"
        height="400"
        image={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        style={{ backgroundImage: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <Rating value={rating / 2} precision={0.5} readOnly />
          <Typography variant="body2" color="text.secondary">
            {rating}/10
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
