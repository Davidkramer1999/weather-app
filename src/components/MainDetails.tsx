import React from "react";

import "./css/MainDetails.css";

import { City } from "./Types/Weather";

interface DetailedInformationProps {
  cityData: City | undefined;
}

function MainDetails({ cityData }: DetailedInformationProps) {
  return (
    <div>
      <div className="verticalTop" />
      <div className="verticalBottom">
        <div className="rightSide">
          {cityData?.main && (
            <div>
              <span> {cityData.name}</span>
              <span className="temperature"> {Math.round(cityData.main.temp)}°</span>
            </div>
          )}
        </div>
        <div>{cityData?.weather?.[0].main}</div>
      </div>
    </div>
  );
}

export default MainDetails;
