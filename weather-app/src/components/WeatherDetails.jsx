import React from 'react'

function WeatherDetails({ weatherDetails }) {
    return (
        <>
            <div className='container-details'>
                <span className='left'>Weather details</span>
            </div>
            <div className='container'>
                <span className='left'>Temperature</span>
                <span className='right '> {weatherDetails?.temp} °C </span>
            </div>
            <div className='container'>
                <span className='left'>Feels like</span>
                <span className='right '> {weatherDetails?.feels_like} °C </span>
            </div >
            <div className='container'>
                <span className='left'>Minimum temperature</span>
                <span className='right '> {weatherDetails?.temp_min} °C</span>
            </div>
            <div className='container'>
                <span className='left'>Maximum temperature</span>
                <span className='right '> {weatherDetails?.temp_max} °C </span>
            </div>
            <div className='container'>
                <span className='left'>Humidity</span>
                <span className='right '> {weatherDetails?.humidity} %</span>
            </div>
        </>
    )
}

export default WeatherDetails