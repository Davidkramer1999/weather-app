import React from "react";
import { City, Cities } from "./Types/Weather";

interface CityHIstoryProp {
  onSelect: (item: City) => void;
  cityHistory?: Cities;
}

export default function CityHistory({ cityHistory, onSelect }: CityHIstoryProp) {
  return (
    <div>
      {cityHistory?.city
        .map((item) => (
          <div className="cityHistory" onClick={() => onSelect(item)} key={item.id}>
            {item.name}
          </div>
        ))
        .reverse()}
    </div>
  );
}
