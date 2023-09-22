import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";

type AgeRatingSelectProps = {
  getAgeRating: (ageRating: string) => void;
  required?: boolean;
  selectedAgeRating?: string;
  isDisableEmptyValue?: boolean;
};

/*
Korhatár kiválasztó
*/
export const AgeRatingSelect = ({
  getAgeRating,
  required,
  selectedAgeRating,
  isDisableEmptyValue = false,
}: AgeRatingSelectProps) => {
  const { theme } = useContext(ThemeContext);

  /* Korhatárok */
  const ageRatings = [
    { _id: 1, value: "none", title: "korhatár" },
    { _id: 2, value: "12", title: "12" },
    { _id: 3, value: "16", title: "16" },
    { _id: 4, value: "18", title: "18" },
    { _id: 5, value: "R", title: "R" },
  ];

  useEffect(() => {
    getAgeRating(selectedAgeRating ? selectedAgeRating : "none");

    return () => {
      getAgeRating("none");
    };
  }, []);

  /*
  Mivel ezt a komponenst használom a fejlécben (Navbar) is és ott szükséges, 
  hogy legyen egy üres lehetőség az összes film megjelenítéséhez
  viszont amikor új filmet akarunk hozzáadni vagy szerkeszteni szeretnénk 
  akkor ne lehessen üres (none) korhatárt megadni
  */
  const filteredAgeRatings = !isDisableEmptyValue
    ? ageRatings
    : ageRatings.filter((ageRating) => ageRating._id !== 1);

  //korhatár kiválasztás kezelés
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    getAgeRating(selectedValue);
  };

  //ha van külsőleg megadott korhatár érték, akkor azt állítsa be arra, ha az sincs, akkor legyen az alapértelmezett (none)
  const selectedAgeRatingOrNone = selectedAgeRating
    ? selectedAgeRating
    : ageRatings[0].value;

  /* 
    ha nincs engedélyezve az üres érték (none) és nincs külsőleg megadott érték akkor a szűrt korhatár első eleme lesz kiválasztva, 
    különben ha van külsőleg megadott korhatár érték, akkor azt állítsa be arra, ha az sincs, akkor legyen az alapértelmezett (none)
  */
  const defaultValue =
    isDisableEmptyValue && !selectedAgeRating
      ? filteredAgeRatings[0].value
      : selectedAgeRatingOrNone;

  return (
    <div className={`age-ratin-select age-ratin-select-${theme}`}>
      <select
        onChange={handleSelectChange}
        required={required ? required : false}
        defaultValue={defaultValue}
      >
        {filteredAgeRatings.map((ageRating) => (
          <option value={ageRating.value} key={ageRating._id}>
            {ageRating.title}
          </option>
        ))}
      </select>
    </div>
  );
};
