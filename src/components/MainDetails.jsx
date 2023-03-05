import React from 'react'

import './css/MainDetails.css'

function MainDetails({ cityData }) {
  return (
    <div>
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

export default MainDetails