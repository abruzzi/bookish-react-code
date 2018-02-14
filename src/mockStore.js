import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

const initialState = {}
const middleware = [
  thunk
]

export const mockStore = configureMockStore(middleware)
const store = mockStore(initialState)

export default store