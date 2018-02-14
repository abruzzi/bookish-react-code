import reducer from './reducer'
import * as types from './types'

describe('Reducer', () => {
  it('Set the search keyword', () => {
    const initState = { term: '' }
    const action = {type: types.SET_SEARCH_TERM, term: 'domain'}

    const state = reducer(initState, action)

    expect(state.term).toEqual('domain')
  })

  it('Show loading when request is sent', () => {
    const initState = { loading: false }

    const action = {type: types.FETCH_BOOKS_PENDING}
    const state = reducer(initState, action)

    expect(state.loading).toBeTruthy()
  })
})