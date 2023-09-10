import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Button from "@mui/material/Button";

type DeleteMovieProps = {
  id: number;
  title: string;
  deleteMovie: (id: number) => void;
  onClose: () => void;
};
export const DeleteMovie = ({
  id,
  title,
  deleteMovie,
  onClose,
}: DeleteMovieProps) => {
  const handleDeleteMovie = () => {
    deleteMovie(id);
    onClose();
  };

  return (
    <div className="delete-movie">
      <p>Film törlése</p>
      <p>
        Biztos, hogy törölni akarod a(z) <b>{title}</b> c. filmet?
      </p>
      <div className="action-buttons">
        <Button
          type="submit"
          variant="contained"
          color="warning"
          startIcon={<DeleteOutlineOutlinedIcon />}
          onClick={handleDeleteMovie}
        >
          Törlés
        </Button>
      </div>
    </div>
  );
};
