import {ACTIONS} from '../actions/actions'

const defaultState = {
    isLoading: false,
    hasErrored: false,
    cars: []
}

export function reducer(state = defaultState, action) {
    switch (action.type) {
        case ACTIONS.IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case ACTIONS.HAS_ERRORED:
            return {
                ...state,
                hasErrored: action.hasErrored
            }
        case ACTIONS.CARS_SUCCESS:
            return {
                ...state,
                cars: action.cars
            }
        case ACTIONS.RESET:
            return defaultState;
        default:
            return state;
    }
}
