import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './containers/reducers'

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history)
]

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store