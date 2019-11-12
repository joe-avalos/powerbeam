import { createStore, applyMiddleware } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }))
  || compose

export default function configureStore (initialState = {}) {
    return createStore(
      rootReducer,
      initialState,
      composeEnhancers(applyMiddleware(thunk))
    )
}
