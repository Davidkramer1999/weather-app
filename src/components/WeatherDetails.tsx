import React from "react";

import "./css/WeatherDetails.css";

interface WeatherDetailsProps {
  details: {
    label: string;
    value: number | undefined;
    unit: string;
  }[];
}

function WeatherDetails({ details }: WeatherDetailsProps) {
  return (
    <div>
      <div className="containerDetails">
        <span className="floatLeft">Weather details</span>
      </div>
      {details.map((detail, index) => (
        <div key={index} className="container">
          <span className="floatLeft">{detail.label}</span>
          <span className="floatRight">
            {detail.value} {detail.unit}
          </span>
        </div>
      ))}
    </div>
  );
}

export default WeatherDetails;
