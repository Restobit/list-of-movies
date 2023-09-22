import React from "react";
import Stack from "@mui/material/Stack";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
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
  //Film törlése id alapján és modal bezárása
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
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="info"
            startIcon={<CancelOutlinedIcon />}
            onClick={onClose}
          >
            Mégse
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="warning"
            startIcon={<DeleteOutlineOutlinedIcon />}
            onClick={handleDeleteMovie}
          >
            Törlés
          </Button>
        </Stack>
      </div>
    </div>
  );
};
