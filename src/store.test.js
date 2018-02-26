import axios from 'axios'

import * as actions from './containers/actions'
import store from './store'

describe('Store', () => {
  const books = [
    {id: 1, name: 'Refactoring'}
  ]

  it('Fetch books from remote', () => {
    axios.get = jest.fn().mockImplementation(() => Promise.resolve({data: books}))

    return store.dispatch(actions.fetchBooks()).then(() => {
      const state = store.getState()
      expect(state.list.books.length).toEqual(1)
      expect(state.list.books).toEqual(books)
    })
  })

  it('Feach a book from remote', () => {
    axios.get = jest.fn().mockImplementation(() => Promise.resolve({data: books[0]}))

    return store.dispatch(actions.fetchABook(1)).then(() => {
      const state = store.getState()
      expect(state.list.current).toEqual(books[0])
    })
  })

  it('Perform a search', () => {
    axios.get = jest.fn().mockImplementation(() => Promise.resolve({data: books}))
    store.dispatch(actions.setSearchTerm('domain'))

    return store.dispatch(actions.fetchBooks()).then(() => {
      const state = store.getState()
      expect(state.list.term).toEqual('domain')
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/books?q=domain')
    })
  })
})