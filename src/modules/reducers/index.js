import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import {cardReducer} from './cardReducer'

export default history => combineReducers({
    router: connectRouter(history),
    card: cardReducer
})
