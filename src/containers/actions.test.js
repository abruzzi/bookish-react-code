import {setSearchTerm, fetchBooks, fetchABook, saveReview} from './actions'
import * as types from './types'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import axios from 'axios'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('BookListContainer related actions', () => {
  it('Set search keyword', () => {
    const term = ''
    const expected = {
      type: types.SET_SEARCH_TERM,
      term
    }
    const action = setSearchTerm(term)
    expect(action).toEqual(expected)
  })

  describe('Fetching data from remote', () => {
    it('Fetch data successfully', () => {
      const books = [
        {id: 1, name: 'Refactoring'},
        {id: 2, name: 'Domain-driven design'}
      ]
      axios.get = jest.fn().mockImplementation(() => Promise.resolve({data: books}))

      const expectedActions = [
        { type: types.FETCH_BOOKS_PENDING},
        { type: types.FETCH_BOOKS_SUCCESS, payload: books }
      ]
      const store = mockStore({list: { books: [] }})

      return store.dispatch(fetchBooks()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('Search data with term in state', () => {
      const books = [
        {id: 1, name: 'Refactoring'},
        {id: 2, name: 'Domain-driven design'}
      ]
      axios.get = jest.fn().mockImplementation(() => Promise.resolve({data: books}))

      const store = mockStore({list: { books: [], term: 'domain' }})

      return store.dispatch(fetchBooks('')).then(() => {
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/books?q=domain')
      })
    })

    it('Fetch book by id', () => {
      const book = {id: 1, name: 'Refactoring'}
      axios.get = jest.fn().mockImplementation(() => Promise.resolve({data: book}))

      const store = mockStore({list: { books: [], term: '' }})

      return store.dispatch(fetchABook(1)).then(() => {
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/books/1')
      })
    })

    it('Save a review for a book', () => {
      const config = {
        headers: { 'Content-Type': 'application/json' }
      }

      const review = {
        name: 'Juntao Qiu',
        content: 'Excellent work!'
      }
      axios.post = jest.fn().mockImplementation(() => Promise.resolve({}))

      const store = mockStore({list: { books: [], term: '' }})

      return store.dispatch(saveReview(1, review)).then(() => {
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/books/1/reviews', JSON.stringify(review), config)
      })
    })

    it('Fetch data with error', () => {
      axios.get = jest.fn().mockImplementation(() => Promise.reject({message: 'Something went wrong'}))

      const expectedActions = [
        { type: types.FETCH_BOOKS_PENDING},
        { type: types.FETCH_BOOKS_FAILED, err: 'Something went wrong' }
      ]
      const store = mockStore({list: { books: [] }})

      return store.dispatch(fetchBooks()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
})