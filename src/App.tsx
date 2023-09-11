import React, { useEffect, useMemo, useState } from "react";
import {
  asyncCreateMovie,
  asyncFetchMovies,
  asyncUpdateMovie,
  asyncDeleteMovie,
  asyncFetchDummyMovies,
} from "./services/asyncFetchServices";
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Movie } from "./ts/interfaces";
import { MovieCard } from "./components/Movie/Movie";
import { AgeRatingSelect } from "./components/AgeRatingSelect/AgeRatingSelect";
import { CreateMovie } from "./components/MovieActions/CreateMovie";
import { Modal } from "./components/Modal/Modal";
import "./App.scss";
import "./style/styles.scss";

function App() {
  const memoizedAsyncFetchMovies = useMemo(() => asyncFetchDummyMovies(), []);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ageRatingFilter, setAgeRatingFilter] = useState("none");
  const [isShowCreate, setIsShowCreate] = useState(false);

  const fetchMovies = async () => {
    try {
      const fetchedMovies = await memoizedAsyncFetchMovies;
      setMovies(fetchedMovies);
      setLoading(false);
    } catch (error) {
      setError("Error fetching movies.");
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

  const openCreateMovie = () => {
    setIsShowCreate(true);
  };

  const closeCreateMovie = () => {
    setIsShowCreate(false);
  };

  const updateFilter = (ageRating: string) => {
    setAgeRatingFilter(ageRating);
  };

  const addMovie = (newMovie: Movie) => {
    const updatedMovies = [...movies, newMovie];
    setMovies(updatedMovies);

    asyncCreateMovie(newMovie)
      .then((createdMovie) => {
        console.log("Film létrehozva:", createdMovie);
      })
      .catch((error) => {
        console.error("Film létrehozása sikertelen:", error);
      });

    closeCreateMovie();
  };

  const editMovie = (id: number, updatedData: Partial<Movie>) => {
    const updatedMovies = movies.map((movie) =>
      movie._id === id ? { ...movie, ...updatedData } : movie
    );
    setMovies(updatedMovies);

    asyncUpdateMovie(id, updatedData)
      .then((updatedMovie) => {
        console.log("Film frissítve:", updatedMovie);
      })
      .catch((error) => {
        console.error("Film frissítése sikertelen:", error);
      });
  };

  const deleteMovie = (id: number) => {
    const movieIndex = movies.findIndex((movie) => movie._id === id);
    if (movieIndex !== -1) {
      const updatedMovies = [...movies];
      updatedMovies.splice(movieIndex, 1);
      setMovies(updatedMovies);

      asyncDeleteMovie(id)
        .then(() => {
          console.log("Film törölve");
        })
        .catch((error) => {
          console.error("Film törlése sikertelen:", error);
        });
    }
  };

  return (
    <div className="App">
      <div className="nav">
        <AgeRatingSelect updateFilter={updateFilter} />
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={openCreateMovie}
        >
          Új film
        </Button>
        <Modal
          isOpen={isShowCreate}
          onClose={closeCreateMovie}
          showClose={true}
        >
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
          <MovieCard
            key={movie._id}
            {...movie}
            editMovie={editMovie}
            deleteMovie={deleteMovie}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
