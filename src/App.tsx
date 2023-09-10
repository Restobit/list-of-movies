import React, { useEffect, useMemo, useState } from "react";
import { asyncFetchMovies } from "./services/asyncFetchMovies";
import { Movie } from "./ts/interfaces";
import { MovieCard } from "./components/Movie/Movie";
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { AgeRatingSelect } from "./components/AgeRatingSelect/AgeRatingSelect";
import "./App.scss";
import "./style/styles.scss";
import Modal from "./components/Modal/Modal";
import { CreateMovie } from "./components/MovieActions/CreateMovie";

function App() {
  const memoizedAsyncFetchMovies = useMemo(() => asyncFetchMovies(), []);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ageRatingFilter, setAgeRatingFilter] = useState("none");

  const [isShowCreate, setIsShowCreate] = useState(false);

  const fetchMovies = async () => {
    try {
      const fetchedProjects = await memoizedAsyncFetchMovies;
      setMovies(fetchedProjects);
      setLoading(false);
    } catch (error) {
      setError("Error fetching projects.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [memoizedAsyncFetchMovies]);

  const filteredMovies =
    ageRatingFilter === "none"
      ? movies
      : movies.filter((movie) => movie.ageRating === ageRatingFilter);

  if (loading) {
    return <p>Töltés...</p>;
  }

  if (error) {
    return <p>Hiba: {error}</p>;
  }

  const showCreateMovie = () => {
    setIsShowCreate(!isShowCreate);
  };

  const updateFilter = (ageRating: string) => {
    setAgeRatingFilter(ageRating);
  };

  const addMovie = (newMovie: Movie) => {
    const updatedMovies = [...movies, newMovie];
    setMovies(updatedMovies);
    showCreateMovie();
  };

  return (
    <div className="App">
      <div className="nav">
        <AgeRatingSelect updateFilter={updateFilter} />
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={showCreateMovie}
        >
          Új film
        </Button>
        <Modal isOpen={isShowCreate} onClose={showCreateMovie} showClose={true}>
          <CreateMovie updateMovieList={addMovie} />
        </Modal>
      </div>
      <div className="container">
        {(!movies || movies.length === 0) && <p>Nincsenek filmek.</p>}

        {(!filteredMovies ||
          (filteredMovies.length === 0 && movies.length > 0)) && (
          <p>Nincs ilyen film.</p>
        )}
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
