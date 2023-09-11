import { API_URL } from "../constants/api";
import { Movie } from "../ts/interfaces";
import axios from "axios";

export const asyncFetchDummyMovies = async (): Promise<Movie[]> => {
  const dumyMovies: Movie[] = [
    {
      _id: 1,
      title: "hangya 1",
      description: "leírás nagyon szép",
      ageRating: "12",
    },
    {
      _id: 2,
      title: "hangya 2",
      description: "leírás nagyon szép",
      ageRating: "18",
    },
  ];
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const movies: Movie[] = dumyMovies;
  return movies;
};

export const asyncFetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Film létrehozása sikertelen:", error);
    throw error;
  }
};

export const asyncCreateMovie = async (newMovie: Movie) => {
  try {
    const response = await axios.post(API_URL, newMovie);
    return response.data;
  } catch (error) {
    console.error("Film létrehozása sikertelen:", error);
    throw error;
  }
};

export const asyncUpdateMovie = async (
  id: number,
  updatedMovie: Partial<Movie>
) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedMovie);
    return response.data;
  } catch (error) {
    console.error("Film frissítése sikertelen:", error);
    throw error;
  }
};

export const asyncDeleteMovie = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Film törlése sikertelen:", error);
    throw error;
  }
};
