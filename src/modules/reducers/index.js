import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import {cardReducer} from './cardReducer'
//Create root reducer with history from connected router
export default history => combineReducers({
    router: connectRouter(history),
    card: cardReducer
})
