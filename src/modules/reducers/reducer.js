import {ACTIONS} from '../actions/actions'
import _ from 'lodash'

const defaultState = {
    isLoading: false,
    hasErrored: false,
    item: {}
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
        case ACTIONS.SUCCESS:
            //Get card "value" from random int % 52
            let stateItem = _.cloneDeep(state.item)
            let item = action.item
            stateItem.push(item)
            return {
                ...state,
                item: item
            }
        case ACTIONS.RESET:
            return defaultState;
        default:
            return state;
    }
}
