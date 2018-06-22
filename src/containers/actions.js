import axios from 'axios'
import * as types from './types'

export const setSearchTerm = (term) => {
  return {type: 'SET_SEARCH_TERM', term}
}

export const fetchBooks = () => {
  return (dispatch, getState) => {
    dispatch({type: types.FETCH_BOOKS_PENDING})
    const state = getState()
    return axios.get(`http://localhost:8080/books?q=${state.list.term}`).then((res) => {
      dispatch({type: types.FETCH_BOOKS_SUCCESS, payload: res.data})
    }).catch((err) => {
      dispatch({type: types.FETCH_BOOKS_FAILED, err: err.message})
    })
  }
}

export const fetchABook = (id) => {
  return (dispatch) => {
    dispatch({type: types.FETCH_BOOK_PENDING})
    return axios.get(`http://localhost:8080/books/${id}`).then((res) => {
      dispatch({type: types.FETCH_BOOK_SUCCESS, payload: res.data})
    }).catch((err) => {
      dispatch({type: types.FETCH_BOOK_FAILED, err: err.message})
    })
  }
}

export const saveReview = (id, review) => {
  return (dispatch) => {
    dispatch({type: types.SAVE_BOOK_REVIEW_PENDING})
    return axios.post(`http://localhost:8080/books/${id}`, review).then((res) => {
      dispatch({type: types.SAVE_BOOK_REVIEW_SUCCESS, payload: res.data})
    }).catch((err) => {
      dispatch({type: types.SAVE_BOOK_REVIEW_FAILED, err: err.message})
    })
  }
}