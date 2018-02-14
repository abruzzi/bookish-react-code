export const setSearchTerm = (term) => {
  return {type: 'SET_SEARCH_TERM', term}
}

import axios from 'axios'

export const fetchBooks = () => {
  return (dispatch) => {
    dispatch({type: 'FETCH_BOOKS_PENDING'})
    return axios.get(`http://localhost:8080/books`).then((res) => {
      dispatch({type: 'FETCH_BOOKS_SUCCESS', payload: res.data})
    }).catch((err) => {
      dispatch({type: 'FETCH_BOOKS_FAILED', err: err.message})
    })
  }
}