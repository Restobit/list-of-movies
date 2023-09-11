import React from "react";

type AgeRatingSelectProps = {
  getAgeRating: (ageRating: string) => void;
  required?: boolean;
  selectedAgeRating?: string;
};

/*
Korhatár kiválasztó
*/
export const AgeRatingSelect = ({
  getAgeRating,
  required,
  selectedAgeRating,
}: AgeRatingSelectProps) => {
  /*Korhatárok*/
  const ageRatings = [
    { _id: 1, value: "none", title: "korhatár" },
    { _id: 2, value: "12", title: "12" },
    { _id: 3, value: "16", title: "16" },
    { _id: 4, value: "18", title: "18" },
    { _id: 5, value: "R", title: "R" },
  ];

  //korhatár kiválasztás kezelés
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    getAgeRating(event.target.value);
  };

  return (
    <div className="age-ratin-select">
      <select
        onChange={(event) => handleSelectChange(event)}
        required={required ? required : false}
        defaultValue={selectedAgeRating ? selectedAgeRating : "none"}
      >
        {ageRatings.map((ageRating) => (
          <option value={ageRating.value} key={ageRating._id}>
            {ageRating.title}
          </option>
        ))}
      </select>
    </div>
  );
};
