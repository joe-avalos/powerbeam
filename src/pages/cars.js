import React, {useEffect, useState} from 'react'
import Container from '@material-ui/core/Container'

//Import necessary redux functions
import {useDispatch, useSelector} from 'react-redux'

import {fetchCars, setHasErrored} from '../modules/actions/actions'
import {carsJson} from '../carsJson'
import CarTable from '../components/carTable'

export default function () {
  const dispatch = useDispatch()
  //Get redux state
  useEffect(() => {
    dispatch(fetchCars())
  }, [])
  
  const {cars, isLoading, hasErrored} = useSelector(state => state.data)
  const [carData, setCarData] = useState(cars)
  useEffect(() => {
    setCarData(cars)
  }, [isLoading])
  //Check if dealer cards have changed
  let content
  const loadOffline = () => {
    dispatch(setHasErrored(false))
    setCarData(carsJson)
  }
  if (hasErrored) {
    content = <div className="alert alert-danger">
      An error has occurred. Please <span onClick={loadOffline}>click here</span> to load stored results.
    </div>
  } else if (isLoading) {
    content = <h1 className="text-center">Loading...</h1>
  } else {
    content = <CarTable cars={carData} />
  }
  return (
    <Container maxWidth={'lg'} className="container mb-3">
      {content}
    </Container>
  )
}
