import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPerson, getPersonMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import MovieList from "../components/movieList";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const ActorDetailsPage = () => {
  const { id } = useParams();

  const {
    data: actor,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["person", { id }],
    queryFn: getPerson,
  });

  const {
    data: movieCredits,
    isPending: creditsPending,
    isError: creditsError,
  } = useQuery({
    queryKey: ["personMovieCredits", { id }],
    queryFn: getPersonMovieCredits,
  });

  if (isPending || creditsPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  if (creditsError) {
    return <h2>Unable to load actor's movies.</h2>;
  }

  const movies = movieCredits.cast;

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      <Grid size={{ xs: 12, md: 4 }}>
        {actor.profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        )}
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        <Typography variant="h4" gutterBottom>
          {actor.name}
        </Typography>

        <Typography variant="subtitle1" color="primary">
          {actor.known_for_department}
        </Typography>

        {actor.birthday && (
          <Typography>
            Born: {actor.birthday}
          </Typography>
        )}

        {actor.place_of_birth && (
          <Typography>
            Place of birth: {actor.place_of_birth}
          </Typography>
        )}

        <Typography variant="h6" sx={{ mt: 3 }}>
          Biography
        </Typography>

        <Typography paragraph>
          {actor.biography || "No biography available."}
        </Typography>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Movies featuring {actor.name}
        </Typography>

{movies.length > 0 ? (
  <Grid container spacing={2}>
    <MovieList
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  </Grid>
) : (
  <Typography>No movies found.</Typography>
)}

      </Grid>
    </Grid>
  );
};

export default ActorDetailsPage;
