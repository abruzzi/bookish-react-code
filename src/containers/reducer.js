import * as types from './types'

const initialState = {
  term: '',
  loading: true,
  books: [],
  error: '',
  current: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SEARCH_TERM:
      return {
        ...state,
        term: action.term
      }
    case types.FETCH_BOOKS_PENDING:
      return {
        ...state,
        loading: true
      }
    case types.FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload,
        loading: false
      }
    case types.FETCH_BOOKS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.err
      }
    case types.FETCH_BOOK_SUCCESS:
      return {
        ...state,
        current: action.payload
      }
    default:
      return state
  }
}