import { useQuery } from "@tanstack/react-query";
import { getMovieRecommendations } from "../../api/tmdb-api";
import MovieList from "../movieList";
import Spinner from "../spinner";
import AddToFavoritesIcon from "../cardIcons/addToFavorites";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const MovieRecommendations = ({ movie }) => {

  const { data: recommendations, error, isPending, isError } = useQuery({
    queryKey: ["recommendations", { id: movie.id }],
    queryFn: getMovieRecommendations,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <Typography variant="h5" component="h3">
        Recommended Movies
      </Typography>

      {recommendations.length > 0 ? (
        <Grid container spacing={2}>
          <MovieList
            movies={recommendations}
            action={(movie) => (
              <AddToFavoritesIcon movie={movie} />
            )}
          />
        </Grid>
      ) : (
        <Typography>
          No recommendations available.
        </Typography>
      )}
    </>
  );
};

export default MovieRecommendations;
