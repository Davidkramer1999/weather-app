import React from 'react'
import './css/WeatherDetails.css';

function WeatherDetails({ temp, feelsLike, tempMin, tempMax, humidity }) {
    return (
        <div>
            <div className='containerDetails'>
                <span className='floatLeft'>Weather details</span>
            </div>
            <div className='container'>
                <span className='floatLeft'>Temperature</span>
                <span className='floatRight '> {temp} °C </span>
            </div>
            <div className='container'>
                <span className='floatLeft'>Feels like</span>
                <span className='floatRight '> {feelsLike} °C </span>
            </div >
            <div className='container'>
                <span className='floatLeft'>Minimum temperature</span>
                <span className='floatRight '> {tempMin} °C</span>
            </div>
            <div className='container'>
                <span className='floatLeft'>Maximum temperature</span>
                <span className='floatRight '> {tempMax} °C </span>
            </div>
            <div className='container'>
                <span className='floatLeft'>Humidity</span>
                <span className='floatRight '> {humidity} %</span>
            </div>
        </div>
    )
}

export default WeatherDetails