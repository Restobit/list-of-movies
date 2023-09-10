import React from "react";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { AgeRatingSelect } from "../AgeRatingSelect/AgeRatingSelect";
import { Movie } from "../../ts/interfaces";

type EditMovieProps = {
  title: string;
  description: string;
  ageRating: string;
  updateMovieList: () => {};
};

export const EditMovie = ({
  title,
  description,
  ageRating,
  updateMovieList,
}: EditMovieProps) => {
  const updateFields = ({ title, description, ageRating }: Partial<Movie>) => {
    console.log("Title", title);
    console.log("description", description);
    console.log("ageRating", ageRating);
  };

  const getFilterValue = (ageRating: string) => {
    updateFields({ ageRating });
  };

  const onSubmit = () => {
    console.log("edited movie");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="movie-form">
        <h4>Film szerkesztése</h4>
        <div className="movie-fields">
          <div className="movie-input">
            <label>Film címe</label>
            <input
              type="text"
              name="title"
              value={title}
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
              minLength={50}
              maxLength={500}
              value={description}
              onChange={(event) =>
                updateFields({ description: event.target.value })
              }
            />
            <label>Korhatár</label>
            <AgeRatingSelect
              updateFilter={getFilterValue}
              required={true}
              selectedAgeRating={ageRating}
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
