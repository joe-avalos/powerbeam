import React from 'react'
import {useParams} from 'react-router-dom'

const CarPage = () => {
  let {UID} = useParams()
  return (
    <div className="container">
      <h1>{UID}</h1>
    </div>
  )
}

export default CarPage
