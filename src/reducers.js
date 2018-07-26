import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import list from './redux/reducer/reducer'

export default combineReducers({
  routing: routerReducer,
  list
})