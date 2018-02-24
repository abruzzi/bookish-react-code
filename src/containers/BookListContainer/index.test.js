import React from 'react'
import {shallow} from 'enzyme'

import {BookListContainer} from './index'

describe('BookListContainer', () => {
  it('render', () => {
    const props = {
      loading: false,
      books: [],
      fetchBooks: jest.fn()
    }

    const wrapper = shallow(<BookListContainer {...props} />)
    expect(wrapper.find('SearchBox').length).toEqual(1)
    expect(wrapper.find('BookList').length).toEqual(1)
  })

  it('invoke correct actions', () => {
    const props = {
      loading: false,
      books: [],
      fetchBooks: jest.fn(),
      setSearchTerm: jest.fn()
    }

    const wrapper = shallow(<BookListContainer {...props} />)

    wrapper.find('SearchBox').simulate('change', {target: {value: 'domain'}})
    expect(props.setSearchTerm).toHaveBeenCalledWith('domain')
    expect(props.fetchBooks).toHaveBeenCalled()
  })
})