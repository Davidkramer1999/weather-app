import React from 'react';
import { useState } from 'react';
import Search from './Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import WeatherDetails from './WeatherDetails';


export default function Template() {
    const [city, setNameCity] = useState("");
    const [data, setData] = useState({});
    const [previousCities, setPreviousData] = useState([]);

    async function fetchData() {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL
                + city + process.env.REACT_APP_KEY + process.env.REACT_APP_METRIC}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            setData(json);
            previousCities.push(json)
            if (previousCities.length > 5) {
                previousCities.shift()
            }
            setNameCity("")
        } catch (e) {
            alert('Please note that searching by states available only for the USA locations')
        }
    }

    const selectPreviousLocation = (item) => {
        setNameCity(item.name)
        setData(item)
    }

    const backgroundImage = () => {
        const weatherImage = data.weather?.[0].main
        return weatherImage === "Clouds" ? "cloudy" :
            weatherImage === "Raining" ? "raining" :
                weatherImage === "Snowing" ? "snowing" :
                    weatherImage === "Mist" ? "snowing" : "cloudy"
    }

    return (
        <div className={`'background ' ${backgroundImage()}`}>
            <div className="blur">
                <div className='column1'>
                    <span>
                        <Search
                            value={city}
                            onChange={setNameCity} />
                        <FontAwesomeIcon onClick={() => fetchData()} icon={faSearch} />
                        {previousCities.map((item, i) => (
                            <div className='previousCities' onClick={() => selectPreviousLocation(item)} key={item.id + i}>{item.name}</div>
                        ))}
                    </span>
                </div>
                <div className='column2'>
                    <WeatherDetails
                        weatherDetails={data.main}
                    />
                </div>
            </div>
            <div className='column1' />
            <div className='column2'>
                <div className='right-side'>
                    <div>
                        <span> {data.name}</span>
                        <span className='temperature'>{data.main?.temp}°</span>
                    </div>
                </div>
                <div>{data.weather?.[0].main}</div>
            </div>
        </div>

    )
}

