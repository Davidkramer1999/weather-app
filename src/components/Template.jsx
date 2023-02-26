import React from 'react';
import { useState } from 'react';
import Search from './Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import WeatherDetails from './WeatherDetails';
import './css/Template.css';

export default function Template() {
    const [city, setCityName] = useState("");
    const [cityData, setCityData] = useState({});
    const [cityHistory, setCityHistory] = useState([]);

    async function fetchData() {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}${city}${process.env.REACT_APP_KEY}${process.env.REACT_APP_METRIC}`);
            if (!response.ok) {
                throw new Error();
            }
            const json = await response.json();
            setCityData(json);
            cityHistory.push(json)
            if (cityHistory.length > 5) {
                setCityHistory(cityHistory.slice(1))
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
        return weatherImage === "Clouds" ? "clouds background" :
            weatherImage === "Rain" ? "rain background" :
                weatherImage === "Snow" ? "snow background " :
                    weatherImage === "Mist" ? "snow background" :
                        weatherImage === "Clear" ? "clear background" :
                            weatherImage === "Fog" ? "fog background" : "clouds background"
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
                        {cityHistory.map((item, i) => (
                            <div className='cityHistory' onClick={() => selectPreviousLocation(item)} key={item.id + i}>{item.name}</div>
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
                <div className='rightSide'>
                    {
                        typeof cityData.main === "undefined" ? <span /> :
                            <div>
                                <span> {cityData.name}</span>
                                <span className='temperature'> {Math.round(cityData.main?.temp)}°</span>
                            </div>
                    }
                </div>
                <div>{cityData.weather?.[0].main}</div>
            </div>
        </div>
    )
}
