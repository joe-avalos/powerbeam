import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import {reducer} from './reducer'
//Create root reducer with history from connected router
export default history => combineReducers({
    router: connectRouter(history),
    item: reducer
})
