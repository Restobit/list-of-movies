import React, { FormEvent, useState } from "react";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { AgeRatingSelect } from "../AgeRatingSelect/AgeRatingSelect";
import { Movie } from "../../ts/interfaces";

type CreateMovieProps = {
  updateMovieList: (movie: Movie) => void;
};

export const CreateMovie = ({ updateMovieList }: CreateMovieProps) => {
  const [newMovie, setNewMovie] = useState<Movie | {}>({});

  const updateFields = (fields: Partial<Movie>) => {
    setNewMovie((prev) => {
      return { ...prev, ...fields };
    });
  };

  const getFilterValue = (ageRating: string) => {
    updateFields({ ageRating });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    updateMovieList(newMovie as Movie);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="movie-form">
        <h4>Film létrehozása</h4>
        <div className="movie-fields">
          <div className="movie-input">
            <label>Film címe</label>
            <input
              type="text"
              name="title"
              autoFocus={true}
              required
              max={255}
              onChange={(event) => updateFields({ title: event.target.value })}
            />
            <label>Leírás</label>
            <textarea
              name="title"
              cols={8}
              rows={5}
              minLength={3}
              maxLength={500}
              onChange={(event) =>
                updateFields({ description: event.target.value })
              }
            />
            <label>Korhatár</label>
            <AgeRatingSelect updateFilter={getFilterValue} required={true} />
          </div>
        </div>
      </div>
      <div className="action-buttons">
        <Button
          type="submit"
          variant="contained"
          color="success"
          startIcon={<SaveIcon />}
        >
          Mentés
        </Button>
      </div>
    </form>
  );
};
