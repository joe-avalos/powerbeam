import { createStore, applyMiddleware, compose } from 'redux'
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

export const history = createBrowserHistory()

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }))
  || compose

export default function configureStore (initialState = {}) {
    return createStore(
      rootReducer(history),
      initialState,
      composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
    )
}
