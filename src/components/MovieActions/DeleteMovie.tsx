import React from "react";
import Stack from "@mui/material/Stack";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Button from "@mui/material/Button";

type DeleteMovieProps = {
  id: number;
  title: string;
};
export const DeleteMovie = ({ id, title }: DeleteMovieProps) => {
  const handleDeleteMovie = () => {
    console.log("ID:", id, "Title:", title);
  };
  return (
    <div className="delete-movie">
      <p>Film törlése</p>
      <p>Biztos, hogy törölni akarod a(z) {title} c. filmet?</p>
      <div className="action-buttons">
        <Stack direction="row" spacing={2}>
          <Button
            type="submit"
            variant="contained"
            color="info"
            startIcon={<CancelOutlinedIcon />}
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
