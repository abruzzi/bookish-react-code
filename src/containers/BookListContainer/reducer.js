const initialState = {
  term: '',
  loading: true,
  books: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PERFORM_SEARCH':
      return {
        ...state,
        term: action.term
      }
    case 'FETCH_BOOKS':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_BOOKS_FULFILLED':
      return {
        ...state,
        books: action.payload,
        loading: false
      }
    case 'FETCH_BOOKS_REJECTED':
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}