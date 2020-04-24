import {carsJson} from '../../carsJson'

const urlCars = 'http://tortops.com/vehiculosRegistro'
//Set constants for consistency across app
export const ACTIONS = {
  IS_LOADING: 'IS_LOADING',
  HAS_ERRORED: 'HAS_ERRORED',
  CARS_SUCCESS: 'CARS_SUCCESS',
  RESET: 'RESET',
}

export function setHasErrored(bool) {
  return {
    type: ACTIONS.HAS_ERRORED,
    hasErrored: bool,
  };
}

export function isLoading(bool) {
  return {
    type: ACTIONS.IS_LOADING,
    isLoading: bool,
  };
}

export function successCars(cars) {
  return {
    type: ACTIONS.CARS_SUCCESS,
    cars: cars,
  };
}


export function fetchCars() {
  return async (dispatch) => {
    //Set loading to true
    dispatch(isLoading(true))
    try {
      const response = await fetch(urlCars)
      if (!response.ok) {
        //Throw error if response not ok
        throw Error()
      }
      let cars = await response.json()
      dispatch(successCars(cars))
      dispatch(isLoading(false))
    } catch (e) {
      dispatch(setHasErrored(true))
      dispatch(isLoading(false))
    }
  };
}
