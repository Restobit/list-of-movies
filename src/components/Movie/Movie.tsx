import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import IconButton from "@mui/material/IconButton";
import classNames from "classnames";

type MovieCardProps = {
  title: string;
  description: string;
  ageRating: string;
};

export const MovieCard = ({
  title,
  description,
  ageRating,
}: MovieCardProps) => {
  const isAdultContent = ageRating === "18" || ageRating === "R";
  return (
    <div className="movie-card">
      <div className="movie-card-title">
        <p>{title}</p>
        <span
          className={classNames("age-rating", {
            "age-rating--red": isAdultContent,
          })}
        >
          {ageRating}
        </span>
      </div>

      <p className="movie-card-description">{description}</p>
      <div className="action-buttons">
        <IconButton aria-label="info" color="info">
          <InfoOutlinedIcon />
        </IconButton>

        <IconButton aria-label="edit" color="primary">
          <EditNoteOutlinedIcon />
        </IconButton>

        <IconButton aria-label="delete" color="warning">
          <CancelOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};
