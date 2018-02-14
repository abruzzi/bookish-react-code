export const setSearchTerm = (term) => {
  return {type: 'SET_SEARCH_TERM', term}
}

import axios from 'axios'

export const fetchBooks = () => {
  return (dispatch, getState) => {
    dispatch({type: 'FETCH_BOOKS_PENDING'})
    const state = getState()
    return axios.get(`http://localhost:8080/books?q=${state.term}`).then((res) => {
      dispatch({type: 'FETCH_BOOKS_SUCCESS', payload: res.data})
    }).catch((err) => {
      dispatch({type: 'FETCH_BOOKS_FAILED', err: err.message})
    })
  }
}