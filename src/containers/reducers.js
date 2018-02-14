import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import list from './BookListContainer/reducer'

export default combineReducers({
  routing: routerReducer,
  list
})