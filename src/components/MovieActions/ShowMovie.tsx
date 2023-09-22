import React from "react";

type EditMovieProps = {
  title: string;
  description: string;
  ageRating: string;
};

//Adott film részleteinek megmutatása
export const ShowMovie = ({
  title,
  description,
  ageRating,
}: EditMovieProps) => {
  return (
    <div className="show-movie">
      <p>
        <span>Film címe: </span>
        {title}
      </p>
      <p>
        <span>Film leírása: </span>
        {description ? description : "Nincs megadva leírás"}
      </p>
      <p>
        <span>Korhatár: </span>
        {ageRating}
      </p>
    </div>
  );
};
