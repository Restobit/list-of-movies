import React, { FormEvent, useState } from "react";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { AgeRatingSelect } from "../AgeRatingSelect";
import { Movie } from "../../ts/interfaces";

type CreateMovieProps = {
  updateMovieList: (movie: Movie) => void;
  closeModal: () => void;
};

export const CreateMovie = ({
  updateMovieList,
  closeModal,
}: CreateMovieProps) => {
  const [newMovie, setNewMovie] = useState<Movie | {}>({});

  //Film mezőinek frissítése
  const updateFields = (fields: Partial<Movie>) => {
    setNewMovie((prev) => {
      return { ...prev, ...fields };
    });
  };

  //Korhatár érétékének lekérdezése
  const getAgeRatingValue = (ageRating: string) => {
    updateFields({ ageRating });
  };

  //Film létrehozása
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    updateMovieList(newMovie as Movie);
    closeModal();
  };

  return (
    <form onSubmit={onSubmit} style={{ width: "100%" }}>
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
            <AgeRatingSelect
              getAgeRating={getAgeRatingValue}
              required={true}
              selectedAgeRating={"12"}
              isDisableEmptyValue={true}
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
