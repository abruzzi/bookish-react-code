import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import createHistory from 'history/createBrowserHistory'

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import list from './containers/reducer'

const rootReducer = combineReducers({
  routing: routerReducer,
  list
})

export const history = createHistory()

const initialState = {}
const middlewares = [
  thunk,
  routerMiddleware(history)
]

const composedEnhancers = compose(
  applyMiddleware(...middlewares)
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store