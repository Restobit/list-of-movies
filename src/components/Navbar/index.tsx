import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { AgeRatingSelect } from "../AgeRatingSelect";
import { Modal } from "../Modal";
import { CreateMovie } from "../MovieActions/CreateMovie";
import { ThemeContext } from "../../context/ThemeContext";
import { Movie } from "../../ts/interfaces";
import styles from "./navbar.module.scss";
import Stack from "@mui/material/Stack";

type NavProps = {
  setAgeRatingFilter: (ageRating: string) => void;
  addMovie: (newMovie: Movie) => void;
};

export const Navbar = ({ setAgeRatingFilter, addMovie }: NavProps) => {
  const [isShowCreate, setIsShowCreate] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);

  const updateFilter = (ageRating: string) => {
    setAgeRatingFilter(ageRating);
  };

  const openCreateMovie = () => {
    setIsShowCreate(true);
  };

  const closeCreateMovie = () => {
    setIsShowCreate(false);
  };

  const buttonTheme = {
    bgcolor: theme === "light" ? "primary" : "#212121",
    "&:hover": {
      bgcolor: theme === "light" ? "primary" : "#2a2a2a",
    },
  };

  return (
    <div className={`${styles.navbar} ${styles[theme]}`}>
      <div className="movie-manager">
        <Stack direction="row" spacing={4}>
          <AgeRatingSelect getAgeRating={updateFilter} />

          <Button
            variant="contained"
            startIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={openCreateMovie}
            sx={buttonTheme}
          >
            Új film
          </Button>
        </Stack>
      </div>

      <div className={styles["theme-switch"]}>
        <span className={styles["theme-switch-title"]}>
          Turn on the {theme === "light" ? "dark" : "light"} mode
        </span>
        <IconButton
          sx={{ ml: 1 }}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          color="inherit"
        >
          {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </div>

      <Modal isOpen={isShowCreate} onClose={closeCreateMovie} showClose={true}>
        <CreateMovie updateMovieList={addMovie} closeModal={closeCreateMovie} />
      </Modal>
    </div>
  );
};
