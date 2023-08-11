import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./css/Search.css";

interface SearchBarProp {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => Promise<void>;
}

export default function SearchBar({ value, onChange, onSearch }: SearchBarProp) {
  return (
    <div>
      <input type="text" className="input" value={value} onChange={(e) => onChange(e.target.value)} />
      <FontAwesomeIcon onClick={onSearch} icon={faSearch} />
    </div>
  );
}
