import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import createHistory from 'history/createBrowserHistory'

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import books from './redux/reducers/books'
import detail from './redux/reducers/detail'
import errors from './redux/reducers/errors'
import search from './redux/reducers/search'

const rootReducer = combineReducers({
  routing: routerReducer,
  books,
  detail,
  errors,
  search
})

export const history = createHistory()

const initialState = {}
const middlewares = [
  thunk,
  routerMiddleware(history)
]

const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middlewares)
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store