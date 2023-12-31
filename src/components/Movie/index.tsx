import React, { useContext, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import IconButton from "@mui/material/IconButton";
import classNames from "classnames";
import { Modal } from "../Modal";
import { ShowMovie } from "../MovieActions/ShowMovie";
import { EditMovie } from "../MovieActions/EditMovie";
import { Movie } from "../../ts/interfaces";
import { DeleteMovie } from "../MovieActions/DeleteMovie";
import styles from "./movie-card.module.scss";
import { ThemeContext } from "../../context/ThemeContext";

type MovieCardProps = {
  _id: number;
  title: string;
  description: string;
  ageRating: string;
  editMovie: (_id: number, updatedData: Partial<Movie>) => void;
  deleteMovie: (_id: number) => void;
};

export const MovieCard = ({
  _id,
  title,
  description,
  ageRating,
  editMovie,
  deleteMovie,
}: MovieCardProps) => {
  //piros karikás korhatárok
  const isAdultContent = ageRating === "18" || ageRating === "R";
  const ageRatingRedClass = styles["age-rating--red"];
  const { theme } = useContext(ThemeContext);
  const [isInfoShow, setIsInfoShow] = useState(false);
  const [isEditShow, setIsEditShow] = useState(false);
  const [isDeleteShow, setIsDeleteShow] = useState(false);

  const openMovieInfo = () => {
    setIsInfoShow(true);
  };
  const closeMovieInfo = () => {
    setIsInfoShow(false);
  };

  const openMovieEdit = () => {
    setIsEditShow(true);
  };
  const closeMovieEdit = () => {
    setIsEditShow(false);
  };

  const openMovieDelete = () => {
    setIsDeleteShow(true);
  };
  const closeMovieDelete = () => {
    setIsDeleteShow(false);
  };

  //Film tartalmának szerkesztése - id alapján megkeresi az adott filmet és frissíti a tartalmát
  const editCurrentMovie = (_id: number, updatedMovie: Partial<Movie>) => {
    editMovie(_id, updatedMovie);
    closeMovieEdit();
  };

  return (
    <div className={`${styles["movie-card"]} ${styles[theme]}`}>
      <div className={styles["movie-card-title"]}>
        <p>{title}</p>
        <span
          className={classNames(styles["age-rating"], {
            [`${ageRatingRedClass}`]: isAdultContent,
          })}
        >
          {ageRating}
        </span>
      </div>

      <p className={styles["movie-card-description"]}>{description}</p>
      <div className={styles["movie-card-buttons"]}>
        <IconButton aria-label="info" color="info" onClick={openMovieInfo}>
          <InfoOutlinedIcon />
        </IconButton>

        <IconButton aria-label="edit" color="primary" onClick={openMovieEdit}>
          <EditNoteOutlinedIcon />
        </IconButton>

        <IconButton
          aria-label="delete"
          color="warning"
          onClick={openMovieDelete}
        >
          <CancelOutlinedIcon />
        </IconButton>
      </div>

      <Modal isOpen={isInfoShow} onClose={closeMovieInfo} showClose={true}>
        <ShowMovie
          {...{
            title,
            description,
            ageRating,
          }}
        />
      </Modal>

      <Modal isOpen={isEditShow} onClose={closeMovieEdit} showClose={true}>
        <EditMovie
          {...{
            _id,
            title,
            description,
            ageRating,
          }}
          editCurrentMovie={editCurrentMovie}
        />
      </Modal>

      <Modal isOpen={isDeleteShow} onClose={closeMovieDelete} showClose={true}>
        <DeleteMovie
          id={_id}
          title={title}
          deleteMovie={deleteMovie}
          onClose={closeMovieDelete}
        />
      </Modal>
    </div>
  );
};
