import React from 'react';
import { useState, useEffect } from 'react';
import Search from './Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import DetailedInformation from './DetailedInformation';
import MainDetails from './MainDetails';
import ErrorMessage from './ErrorMessage';

import './css/WeatherMain.css';

export default function WeatherTemplate() {
    const [city, setCityName] = useState("")
    const [cityData, setCityData] = useState({})
    const [cityHistory, setCityHistory] = useState([])
    const [errorMessage, setErrorMessage] = useState("")

    async function fetchData() {
        setErrorMessage("")
        if (cityHistory.some(el => el.name === capitalizeFirstLetter(city))) {
            return setErrorMessage(`You already added ${city} `)
        }
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}${process.env.REACT_APP_KEY}&units=metric`);
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
            setErrorMessage(`Could not fetch weather data for provided city ${city}`)
        }
    }

    function capitalizeFirstLetter(str) {
        if (str.length === 0) {
            return "";
        }
        let lowerCaseString = str.toLowerCase();
        return lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1);
    }

    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                fetchData();
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    });


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
                        <FontAwesomeIcon onClick={fetchData} icon={faSearch} />
                        {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
                        {cityHistory.map((item, i) => (
                            <div className='cityHistory' onClick={() => selectPreviousLocation(item)} key={item.id + i}>{item.name}</div>
                        )).reverse()}
                    </span>
                </div>
                <DetailedInformation
                    cityData={cityData}
                />
            </div>
            <MainDetails
                cityData={cityData}
            />
        </div>
    )
}
