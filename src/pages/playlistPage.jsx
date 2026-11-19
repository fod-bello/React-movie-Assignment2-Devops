
import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromPlaylistIcon from "../components/cardIcons/removeFromPlaylist";

const PlaylistPage = () => {
  const { playlist: movieIds } = useContext(MoviesContext);

  // Retrieve all movies in the playlist.
  const playlistMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    }),
  });

  // Check whether any movie is still loading.
  const isPending = playlistMovieQueries.find(
    (movie) => movie.isPending === true
  );

  if (isPending) {
    return <Spinner />;
  }

  // Convert the query results into a movie array.
  const movies = playlistMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });

  return (
    <PageTemplate
      title="My Playlist"
      movies={movies}
      action={(movie) => (
        <RemoveFromPlaylistIcon movie={movie} />
      )}
    />
  );
};

export default PlaylistPage;
