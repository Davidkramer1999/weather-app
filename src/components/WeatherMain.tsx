import React from "react";
import { useState, useEffect } from "react";
import DetailedInformation from "./DetailedInformation";
import MainDetails from "./MainDetails";

import "./css/WeatherMain.css";
import CityHistory from "./CityHistory";
import SearchBar from "./SearchBar";
import { getBackgroundImageClass } from "./GetBackgroundImage";
import ErrorMessage from "./ErrorMessage";
import { capitalizeFirstLetter } from "./helpers";
import { Cities, City } from "./Types/Weather";

export default function WeatherMain() {
  const [city, setCityName] = useState<string>("");
  const [cityData, setCityData] = useState<City | undefined>(undefined);
  const [cityHistory, setCityHistory] = useState<Cities>({ city: [] });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        fetchData();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  function checkCityDuplication(city: string, cityHistory: Cities) {
    if (cityHistory.city.some((el) => el.name === capitalizeFirstLetter(city))) {
      return `You already added ${city}`;
    }
    return null;
  }

  async function fetchWeatherData(city: string) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}${process.env.REACT_APP_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`Could not fetch weather data for provided city ${city}`);
    }
    return await response.json();
  }

  function updateCityHistory(prevCityHistory: Cities, cityData: City) {
    const newHistory = { city: [...prevCityHistory.city, cityData] };
    if (newHistory.city.length > 5) {
      newHistory.city = newHistory.city.slice(1);
    }
    return newHistory;
  }

  async function fetchData() {
    setErrorMessage("");

    const duplicationError = checkCityDuplication(city, cityHistory);
    if (duplicationError) {
      return setErrorMessage(duplicationError);
    }

    try {
      const weatherData = await fetchWeatherData(city);
      setCityData(weatherData);
      setCityHistory((prevCityHistory) => updateCityHistory(prevCityHistory, weatherData));
      setCityName("");
    } catch (e) {
      setErrorMessage(`Could not fetch weather data for provided city ${city}`);
    }
  }

  const selectPreviousLocation = (item: City) => {
    setCityName(item.name);
    setCityData(item);
  };

  const weatherImage = cityData ? cityData.weather?.[0]?.main : undefined;
  const backgroundImageClass = getBackgroundImageClass(weatherImage || "");

  return (
    <div className={`background ${getBackgroundImageClass(backgroundImageClass)}`}>
      <div className="blur">
        <div className="verticalTop">
          <span>
            <SearchBar value={city} onChange={setCityName} onSearch={fetchData} />
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <CityHistory cityHistory={cityHistory} onSelect={selectPreviousLocation} />
          </span>
        </div>
        <DetailedInformation cityData={cityData} />
      </div>
      <MainDetails cityData={cityData} />
    </div>
  );
}
