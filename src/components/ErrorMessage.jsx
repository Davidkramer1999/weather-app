import React from 'react'

import './css/ErrorMessage.css'

function ErrorMessage({ message }) {
  return (
    <div className="errorMessage">{message}</div>
  )
}

export default ErrorMessage