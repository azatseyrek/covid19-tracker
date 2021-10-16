import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  // https://disease.sh/v3/covid-19/countries

  //useEffect for call the api

  useEffect(() => {
    //async -> send request

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);

        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {

    const countryCode = event.target.value;

    console.log(countryCode);

    setCountry(countryCode)
  }

  return (
    <div className="App">
      <div className="app__header">
        <h1>COVID 19 TRACKER</h1>

        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange} >
          <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}> {country.name}</MenuItem>
            ))}

            {/* <MenuItem value="worldwide">World Wide</MenuItem>
            <MenuItem value="worldwide">World Wide</MenuItem>
            <MenuItem value="worldwide">World Wide</MenuItem>
            <MenuItem value="worldwide">World Wide</MenuItem> */}
          </Select>
        </FormControl>
      </div>
      {/* Header */}
      {/* Title + Select Input dropdown */}
      {/* Info Boxes */}
      {/* Info Boxes */}
      {/* Info Boxes */}
      {/* Table */}
      {/* Graph */}
      {/* Map */}
    </div>
  );
}

export default App;
