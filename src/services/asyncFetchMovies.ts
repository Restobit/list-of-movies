import { Movie } from "../ts/interfaces";

export const asyncFetchMovies = async (): Promise<Movie[]> => {
  const dumyMovies: Movie[] = [
    {
      id: 1,
      title: "hangya 1",
      description: "leírás nagyon szép",
      ageRating: "12",
    },
    {
      id: 2,
      title: "hangya 2",
      description: "leírás nagyon szép",
      ageRating: "18",
    },
    {
      id: 3,
      title: "hangya 3",
      description: "leírás nagyon szép",
      ageRating: "12",
    },
    {
      id: 4,
      title: "hangya 4",
      description: "leírás nagyon szép",
      ageRating: "12",
    },
    {
      id: 5,
      title: "hangya 5",
      description: "leírás nagyon szép",
      ageRating: "16",
    },
    {
      id: 6,
      title: "hangya 6",
      description: "leírás nagyon szép",
      ageRating: "12",
    },
    {
      id: 7,
      title: "hangya 7",
      description: "leírás nagyon szép",
      ageRating: "18",
    },
  ];
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const movies: Movie[] = dumyMovies;
  return movies;
};
