import React from "react";
import { Routes, Route } from "react-router-dom"


import WeatherMain from './components/WeatherMain';

import './App.css';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WeatherMain />} />
        <Route
          path="*"
          element={<WeatherMain to="/" replace={true} />}
        />
      </Routes>
    </>

  );
}

