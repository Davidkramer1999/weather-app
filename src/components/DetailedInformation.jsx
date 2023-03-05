import React from 'react'
import WeatherDetails from "./WeatherDetails"

function DetailedInformation({ cityData }) {
  return (
    <div>
      <div className='verticalBottom'>
        <WeatherDetails
          temp={cityData.main?.temp}
          feelsLike={cityData.main?.feels_like}
          tempMin={cityData.main?.temp_min}
          tempMax={cityData.main?.temp_max}
          humidity={cityData.main?.humidity}
        />
      </div>
    </div>
  )
}

export default DetailedInformation