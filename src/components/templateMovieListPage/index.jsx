import { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";


function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);
  const [page,setPage] = useState(1);
  const moviesPerPage = 12;

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

    const totalPages = Math.ceil(displayedMovies.length / moviesPerPage);

    const startIndex = (page - 1) * moviesPerPage;

    const paginatedMovies = displayedMovies.slice(
    startIndex,
    startIndex + moviesPerPage
    );

  const handleChange = (type, value) => {
    setPage(1);
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <MovieList action={action} movies={paginatedMovies} />
        <Grid size={12} sx={{ display: "flex", justifyContent: "center", p: 3 }}>
       <Pagination
  count={totalPages}
  page={page}
  onChange={(event, value) => setPage(value)}
  color="secondary"
  size="large"
  sx={{
    "& .MuiPaginationItem-root": {
      color: "#ffffff",
      fontSize: "1rem",
    },
    "& .MuiPaginationItem-root.Mui-selected": {
      backgroundColor: "#8e24aa",
      color: "#ffffff",
    },
    "& .MuiPaginationItem-root:hover": {
      backgroundColor: "rgba(142, 36, 170, 0.3)",
    },
  }}
/>
</Grid>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
