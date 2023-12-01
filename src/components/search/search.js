import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const geoApiOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_GEO_API_KEY,
      "X-RapidAPI-Host": process.env.REACT_APP_GEO_API_HOST,
    },
  };

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_GEO_API_URL}/cities?minPopulation=750000&namePrefix=${inputValue}`,
        geoApiOptions
      );

      const result = await response.json();

      return {
        options: result.data.map((city) => {
          return {
            value: `${city.latitude}, ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
