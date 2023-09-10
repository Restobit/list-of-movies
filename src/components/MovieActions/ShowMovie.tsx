import React from "react";

type EditMovieProps = {
  title: string;
  description: string;
  ageRating: string;
};

export const ShowMovie = ({
  title,
  description,
  ageRating,
}: EditMovieProps) => {
  return (
    <div className="show-movie">
      <p>Film címe:{title}</p>
      <p>Film leírása: {description}</p>
      <p>Korhatár: {ageRating}</p>
    </div>
  );
};
