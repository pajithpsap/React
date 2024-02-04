import React from 'react'
import { useRouteError } from 'react-router-dom'
const Error = () => {
    const err = useRouteError();
  return (
    <div>
        <h1>This is {err.status}</h1>
    </div>
  )
}

export default Error