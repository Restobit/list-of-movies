import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  asyncCreateMovie,
  asyncFetchMovies,
  asyncUpdateMovie,
  asyncDeleteMovie,
  asyncFetchDummyMovies,
} from "./services/asyncFetchServices";

import { Movie } from "./ts/interfaces";
import { MovieCard } from "./components/Movie";
import { Navbar } from "./components/Navbar";
import "./App.scss";
import "./style/styles.scss";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  /*
  Ha van működő https://crudcrud.com/ URL akkor cseréld ki a asyncFetchDummyMovies-t erre: asyncFetchMovies
  illetve az URL-t cseréld ki az API_URL változóba ami a  src/constants/api.js fájlban van.
  */
  const { theme } = useContext(ThemeContext);
  const memoizedAsyncFetchMovies = useMemo(() => asyncFetchDummyMovies(), []);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ageRatingFilter, setAgeRatingFilter] = useState("none");

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

  const addMovie = (newMovie: Movie) => {
    const movieWithNewID = {
      ...newMovie,
      _id: movies.length + 1,
    };
    const updatedMovies = [...movies, movieWithNewID];
    setMovies(updatedMovies);

    asyncCreateMovie(newMovie)
      .then((createdMovie) => {
        console.log("Film létrehozva:", createdMovie);
      })
      .catch((error) => {
        console.error("Film létrehozása sikertelen:", error);
      });
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
    <div className={theme}>
      <Navbar setAgeRatingFilter={setAgeRatingFilter} addMovie={addMovie} />
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
