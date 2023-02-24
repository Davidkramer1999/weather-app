import React from 'react';
import { useState } from 'react';
import Search from './Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import WeatherDetails from './WeatherDetails';

export default function Template() {
    const [city, setCityName] = useState("");
    const [cityData, setCityData] = useState({});
    const [previousCities, setPreviousCities] = useState([]);

    async function fetchData() {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}${city}${process.env.REACT_APP_KEY}${process.env.REACT_APP_METRIC}`);
            if (!response.ok) {
                throw new Error();
            }
            const json = await response.json();
            setCityData(json);
            previousCities.push(json)
            if (previousCities.length > 5) {
                setPreviousCities(previousCities.slice(1))
            }
            setCityName("")
        } catch (e) {
            alert(`Could not fetch weather data for provided city ${city}`)
        }
    }

    const selectPreviousLocation = (item) => {
        setCityName(item.name)
        setCityData(item)
    }

    const backgroundImage = () => {
        const weatherImage = cityData.weather?.[0].main
        return weatherImage === "Clouds" ? "cloudy background" :
            weatherImage === "Rain" ? "raining background" :
                weatherImage === "Snowing" ? "snowing background " :
                    weatherImage === "Mist" ? "snowing background" : "cloudy background"
    }

    return (
        <div className={`'background ' ${backgroundImage()}`}>
            <div className="blur">
                <div className='verticalTop'>
                    <span>
                        <Search
                            value={city}
                            onChange={setCityName} />
                        <FontAwesomeIcon onClick={() => fetchData()} icon={faSearch} />
                        {previousCities.map((item, i) => (
                            <div className='previousCities' onClick={() => selectPreviousLocation(item)} key={item.id + i}>{item.name}</div>
                        )).reverse()}
                    </span>
                </div>
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
            <div className='verticalTop' />
            <div className='verticalBottom'>
                <div className='right-side'>
                    <div>
                        <span> {cityData.name}</span>
                        <span className='temperature'>{cityData.main?.temp}°</span>
                    </div>
                </div>
                <div>{cityData.weather?.[0].main}</div>
            </div>
        </div>

    )
}
