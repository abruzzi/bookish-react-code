import React from 'react'
import {shallow} from 'enzyme'

import {BookDetailContainer} from './index'

describe('BookDetailContainer', () => {
  it('render', () => {
    const bookId = 1
    const props = {
      match: {
        params: {
          id: bookId
        }
      },
      fetchABook: jest.fn()
    }

    const wrapper = shallow(<BookDetailContainer {...props} />)
    expect(wrapper.find('BookDetail').length).toEqual(1)
    expect(props.fetchABook).toHaveBeenCalledWith(bookId)
  })
})
