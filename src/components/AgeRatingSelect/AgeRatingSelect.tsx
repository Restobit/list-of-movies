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
    { id: 1, value: "none", title: "korhatár" },
    { id: 2, value: "12", title: "12" },
    { id: 3, value: "16", title: "16" },
    { id: 4, value: "18", title: "18" },
    { id: 5, value: "R", title: "R" },
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
          <option value={ageRating.value} key={ageRating.id}>
            {ageRating.title}
          </option>
        ))}
      </select>
    </div>
  );
};
