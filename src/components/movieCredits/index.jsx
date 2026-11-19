import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import {Link} from "react-router";

const MovieCredits = ({ movie }) => {
  const { data: credits, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: movie.id }],
    queryFn: getMovieCredits,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ mt: 3, mb: 2 }}>
        Cast & Actors
      </Typography>

      <Grid container spacing={2}>
        {credits.cast.slice(0, 8).map((actor) => (
          <Grid key={actor.id} size={{ xs: 6, sm: 4, md: 3 }}>
            <Card>
              {actor.profile_path ? (
                <CardMedia
                  component="img"
                  height="220"
                  image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                />
              ) : (
                <Avatar
                  sx={{ width: "100%", height: 220, borderRadius: 0 }}
                >
                  {actor.name.charAt(0)}
                </Avatar>
              )}

              <CardContent>
                <Typography
                   variant="subtitle1"
                 component={Link}
                 to={`/actors/${actor.id}`}
                 sx={{
                 textDecoration: "none",
                 color: "primary.main",
                 fontWeight: "bold",
                   }}
                          >
                           {actor.name}
                          </Typography>

                <Typography variant="body2" color="text.secondary">
                  {actor.character}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MovieCredits;
