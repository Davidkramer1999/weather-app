import React from "react";
import { useState } from "react";
import DetailedInformation from "./DetailedInformation";
import MainDetails from "./MainDetails";

import "./css/WeatherMain.css";
import CityHistory from "./CityHistory";
import SearchBar from "./SearchBar";
import { getBackgroundImageClass } from "./GetBackgroundImage";
import ErrorMessage from "./ErrorMessage";
import { Cities, City } from "./Types/Weather";

function getInitialCityHistory(): Cities {
  const item = localStorage.getItem("cityHistory");
  if (item) {
    return JSON.parse(item) as Cities;
  }
  return { city: [] };
}

export default function WeatherMain() {
  const [city, setCityName] = useState<string>("");
  const [cityData, setCityData] = useState<City | undefined>(undefined);
  const [cityHistory, setCityHistory] = useState<Cities>(getInitialCityHistory);

  const [errorMessage, setErrorMessage] = useState("");

  function checkCityDuplication(city: string, cityHistory: Cities) {
    const cleanedCity = city.trim().toLowerCase();
    if (cityHistory.city.some((el) => el.name.trim().toLowerCase() === cleanedCity)) {
      return `You already added ${city}`;
    }
    return null;
  }

  async function fetchWeatherData(city: string) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_KEY}&units=metric`
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
      localStorage.setItem("cityHistory", JSON.stringify([...cityHistory.city, weatherData]));
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

  return (
    <div className={`${getBackgroundImageClass(weatherImage || "")}`}>
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
