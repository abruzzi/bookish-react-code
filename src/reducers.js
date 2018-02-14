import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import list from './containers/reducer'

export default combineReducers({
  routing: routerReducer,
  list
})