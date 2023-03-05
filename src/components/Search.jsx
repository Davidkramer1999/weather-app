import React from 'react'

import './css/Search.css';

function Search({ onChange, value }) {
  const handleChange = event => {
    onChange(event.target.value);
  };
  return (
    <span >
      <input className='input' type="text" placeholder="Add location" value={value} onChange={handleChange} required/>
    </span>
  )
}

export default Search