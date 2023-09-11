import React from "react";

type AgeRatingSelectProps = {
  updateFilter: (ageRating: string) => void;
  required?: boolean;
  selectedAgeRating?: string;
};

export const AgeRatingSelect = ({
  updateFilter,
  required,
  selectedAgeRating,
}: AgeRatingSelectProps) => {
  const ageRatings = [
    { _id: 1, value: "none", title: "korhatár" },
    { _id: 2, value: "12", title: "12" },
    { _id: 3, value: "16", title: "16" },
    { _id: 4, value: "18", title: "18" },
    { _id: 5, value: "R", title: "R" },
  ];

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilter(event.target.value);
  };

  return (
    <div className="age-ratin-select">
      <select
        onChange={(event) => handleFilterChange(event)}
        required={required}
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
