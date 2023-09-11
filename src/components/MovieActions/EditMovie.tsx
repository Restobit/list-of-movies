import React, { FormEvent, useState } from "react";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { AgeRatingSelect } from "../AgeRatingSelect/AgeRatingSelect";
import { Movie } from "../../ts/interfaces";

type EditMovieProps = {
  _id: number;
  title: string;
  description: string;
  ageRating: string;
  editCurrentMovie: (_id: number, updatedData: Partial<Movie>) => void;
};

export const EditMovie = ({
  _id,
  title,
  description,
  ageRating,
  editCurrentMovie,
}: EditMovieProps) => {
  const [editedMovie, setEditedMovie] = useState<Partial<Movie>>({
    title,
    description,
    ageRating,
  });

  const updateFields = (fields: Partial<Movie>) => {
    setEditedMovie((prev) => {
      return { ...prev, ...fields };
    });
  };

  const getFilterValue = (ageRating: string) => {
    updateFields({ ageRating });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("edited", editedMovie);
    editCurrentMovie(_id, editedMovie);
  };

  return (
    <form onSubmit={onSubmit} style={{ width: "100%" }}>
      <div className="movie-form">
        <h4>Film szerkesztése</h4>
        <div className="movie-fields">
          <div className="movie-input">
            <label>Film címe</label>
            <input
              type="text"
              name="title"
              value={editedMovie.title}
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
              value={editedMovie.description}
              onChange={(event) =>
                updateFields({ description: event.target.value })
              }
            />
            <label>Korhatár</label>
            <AgeRatingSelect
              updateFilter={getFilterValue}
              required={true}
              selectedAgeRating={editedMovie.ageRating}
            />
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
