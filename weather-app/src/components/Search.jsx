import React from 'react'

function Search({ onChange, value }) {
  const handleChange = event => {
    onChange(event.target.value);
  };
  return (
    <span >
      <input className='input' type="text" placeholder="Add location" value={value} onChange={handleChange} />
    </span>
  )
}

export default Search