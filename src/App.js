import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";

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

    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID 19 TRACKER</h1>

          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}> {country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus cases" cases={123} total={2000} />
          <InfoBox title="Recovered" cases={23424} total={2000} />
          <InfoBox title="Deaths" cases={123} total={2000} />
        </div>

        <Map />
      </div>
      <Card className="app__right">
        <CardContent>

         <h3>Live Cases by Country</h3>
         <h3>World wide new cases</h3>
          {/* Table */}
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
