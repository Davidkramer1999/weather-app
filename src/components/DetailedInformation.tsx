import React from "react";

import WeatherDetails from "./WeatherDetails";

import { City } from "./Types/Weather";

interface DetailedInformationProps {
  cityData: City | undefined;
}

function DetailedInformation({ cityData }: DetailedInformationProps) {
  const weatherDetails = [
    { label: "Temperature", value: cityData?.main?.temp, unit: "°C" },
    { label: "Feels like", value: cityData?.main?.feels_like, unit: "°C" },
    { label: "Minimum temperature", value: cityData?.main?.temp_min, unit: "°C" },
    { label: "Maximum temperature", value: cityData?.main?.temp_max, unit: "°C" },
    { label: "Humidity", value: cityData?.main?.humidity, unit: "%" },
  ];
  return (
    <div>
      <div className="verticalBottom">{<WeatherDetails details={weatherDetails} />}</div>
    </div>
  );
}

export default DetailedInformation;
